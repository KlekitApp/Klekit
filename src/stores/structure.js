import _ from 'lodash';
import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';
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
            let settingsStore = useSettingsStore();
            return Object.keys(state.dataByFile[state.activeFile]?.[settingsStore.baseLanguage] || {});
        },
        translatedPercentageByFile: state => {
            let settingsStore = useSettingsStore();
            let result = {};
            state.fileList.forEach(file => {
                let baseKeys = Object.keys(state.dataByFile[file]?.[settingsStore.baseLanguage] || {});
                let translatedKeys = Object.keys(state.dataByFile[file]?.[settingsStore.language] || {});
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
                let settingsStore = useSettingsStore();

                settingsStore.parserSettings = window.api.getParserSettings();

                this.fileList = window.api.getAllFileNamesSync(settingsStore.pathToApp);

                let languages = [
                    settingsStore.baseLanguage,
                    settingsStore.language,
                    ...settingsStore.helpLanguages,
                ];

                this.fileList.forEach((name) => this.fetchFile(name, languages));

                this.isErrorWithList = false;
            } catch (error) {
                this.isErrorWithList = true;
                console.log(error);
            }
        },
        fetchFile(name, languages) {
            let settingsStore = useSettingsStore();

            languages.forEach(language => {
                let structure = window.api.parseFile(settingsStore.pathToApp, name, language);
                if (language === settingsStore.baseLanguage) {
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
            let settingsStore = useSettingsStore();
            let translatorStore = useTranslatorStore();

            window.api.stringifyStructure({
                data: toRaw(translatorStore.currentStructure),
                comments: toRaw(this.comments[this.activeFile]),
                meta: toRaw(this.parserMeta[this.activeFile]),
            }, settingsStore.language, settingsStore.pathToApp, this.activeFile);

            this.fetchFile(this.activeFile, [settingsStore.language]);
        },

        changeActiveFile(file) {
            const translatorStore = useTranslatorStore();
            
            this.activeFile = file;
            translatorStore.reset();
            translatorStore.goToFirstUntranslatedKey();
        }
    }
});