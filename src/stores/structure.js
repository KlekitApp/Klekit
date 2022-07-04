import _ from 'lodash';
import { defineStore } from 'pinia';
import { useProjectsStore } from './projects';
import {toRaw} from 'vue'
import { useTranslatorStore } from './translator';

export const useStructureStore = defineStore('structure', {
    state: () => ({
        fileList: [],
        activeFile: '',
        dataByFile: {},
        comments: {},
        parserMeta: {},
        isErrorWithList: false,
        parserSettings: {},
    }),

    getters: {
        activeFileData: state => {
            return state.dataByFile[state.activeFile] || {};
        },
        activeFileDataKeys: state => {
            let projectsStore = useProjectsStore();
            return Object.keys(state.dataByFile[state.activeFile]?.[projectsStore.projectsStore] || {});
        },
        translatedPercentageByFile: state => {
            let projectsStore = useProjectsStore();
            let result = {};
            state.fileList.forEach(file => {
                let baseKeys = Object.keys(state.dataByFile[file]?.[projectsStore.baseLanguage] || {});
                let translatedKeys = Object.keys(state.dataByFile[file]?.[projectsStore.language] || {});
                if(baseKeys.length === 0) {
                    result[file] = 100;
                } else {
                    result[file] = Math.round((translatedKeys.length / baseKeys.length) * 10000)/100;
                }
            }
            );
            return result;
        }
    },

    actions: {
        fetch() {
            try {
                let projectsStore = useProjectsStore();

                projectsStore.parserSettings = window.api.getParserSettings();

                this.fileList = window.api.getAllFileNamesSync(projectsStore.pathToApp);

                let languages = [
                    projectsStore.baseLanguage,
                    projectsStore.language,
                    ...projectsStore.helpLanguages,
                ];

                this.fileList.forEach((name) => this.fetchFile(name, languages));

                this.isErrorWithList = false;
            } catch (error) {
                this.isErrorWithList = true;
                console.log(error);
            }
        },
        fetchFile(name, languages) {
            let projectsStore = useProjectsStore();

            languages.forEach(language => {
                let structure = window.api.parseFile(projectsStore.pathToApp, name, language);
                if (language === projectsStore.baseLanguage) {
                    this.comments[name] = structure.comments;
                    this.parserMeta[name] = structure.meta;
                }
                this.dataByFile[name] = {
                    ...this.dataByFile[name],
                    [language]: _.mapValues(_.groupBy(structure.data, 'key'), (data) => data[0]),
                }
            });
        },
        saveActiveFile() {
            let projectsStore = useProjectsStore();
            let translatorStore = useTranslatorStore();

            window.api.stringifyStructure({
                data: toRaw(translatorStore.currentStructure),
                comments: toRaw(this.comments[this.activeFile]),
                meta: toRaw(this.parserMeta[this.activeFile]),
            }, projectsStore.language, projectsStore.pathToApp, this.activeFile);

            this.fetchFile(this.activeFile, [projectsStore.language]);
        },

        changeActiveFile(file) {
            const translatorStore = useTranslatorStore();
            
            this.activeFile = file;
            translatorStore.reset();
            translatorStore.goToFirstUntranslatedKey();
        },

        goToFirstUntranslatedFile() {
            let file = _.find(this.fileList, file => this.translatedPercentageByFile[file] < 100);
            if (file) {
                this.changeActiveFile(file);
            }
        }
    }
});