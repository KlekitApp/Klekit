import _ from 'lodash';
import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';
import {toRaw} from 'vue'

export const useStructureStore = defineStore('structure', {
    state: () => ({
        fileList: [],
        activeFile: '',
        dataByFile: {},
        comments: {},
        parserMeta: {},
        isErrorWithList: false,
    }),

    getters: {
        library: state => {
            // merge data from dataByFile
            let library = {};
            Object.keys(state.dataByFile).forEach(file => {
                library = {
                    ...library,
                    ...state.dataByFile[file]
                }
            });
            return library;
        },
        activeFileData: state => {
            return state.dataByFile[state.activeFile] || {};
        },
        activeFileDataKeys: state => {
            return Object.keys(state.dataByFile[state.activeFile] || {});
        },
        translatedPercentageByFile: state => {
            let settingsStore = useSettingsStore();
            let result = {};
            Object.keys(state.dataByFile).forEach(file => {
                let translated = 0;
                let total = 0;
                Object.keys(state.dataByFile[file]).forEach(key => {
                    total++;
                    if (state.dataByFile[file][key][settingsStore.language]?.value) {
                        translated++;
                    }
                }
                );
                if(total === 0) {
                    result[file] = 100;
                } else {
                    result[file] = Math.round((translated / total) * 100);
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

            let keys = [];
            let fileDataGroupedByKeys = {};

            languages.forEach(language => {
                let structure = window.api.parseFile(settingsStore.pathToApp, name, language);
                if (language === settingsStore.baseLanguage) {
                    this.comments[name] = structure.comments;
                    this.parserMeta[name] = structure.meta;
                }
                keys = keys.concat(structure.data.map(item => item.key));
                fileDataGroupedByKeys[language] = _.groupBy(structure.data, 'key');
            });
            keys = _.uniq(keys);

            let dataByKey = {};

            keys.forEach(key => {
                let data = {};
                languages.forEach(language => {
                    data[language] = fileDataGroupedByKeys[language][key] ? fileDataGroupedByKeys[language][key][0] : undefined;
                });
                dataByKey[key] = data;
            });
            
            this.dataByFile[name] = dataByKey;
        },
        saveActiveFile() {
            let settingsStore = useSettingsStore();

            this.rawActiveFile = window.api.stringifyStructure({
                data: _.mapValues(toRaw(this.dataByFile[this.activeFile]), item => item[settingsStore.language]),
                comments: toRaw(this.comments[this.activeFile]),
                meta: toRaw(this.parserMeta[this.activeFile]),
            }, settingsStore.language, settingsStore.pathToApp, this.activeFile);

            this.fetchFile(this.activeFile, [settingsStore.language]);
        },

        changeActiveFile(file) {
            let settingsStore = useSettingsStore();

            this.activeFile = file;

            try {
                this.rawActiveFile = window.api.stringifyStructure({
                    data: _.mapValues(toRaw(this.dataByFile[file]), item => item[settingsStore.language]),
                    comments: toRaw(this.comments[file]),
                    meta: toRaw(this.parserMeta[file])
                }, settingsStore.language);
            } catch (error) {
                console.log(error);
            }
        }
    }
});