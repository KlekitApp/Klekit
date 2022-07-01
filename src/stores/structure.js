import _ from 'lodash';
import { defineStore } from 'pinia';
import { useSettingsStore } from './settings';

export const useStructureStore = defineStore('structure', {
    state: () => ({
        fileList: [],
        activeFile: '',
        dataByFile: {},
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

                let fileList = window.api.getAllFileNamesSync(settingsStore.pathToApp);
                fileList = fileList.map(name => {
                    let englishStructure = window.api.parseFile(settingsStore.pathToApp, name, 'english');
                    let languageStructure = window.api.parseFile(settingsStore.pathToApp, name, settingsStore.language);
                    
                    let result = {
                        name,
                        structures: {
                            english: englishStructure,
                            [settingsStore.language]: languageStructure,
                        }
                    };
                    settingsStore.helpLanguages.forEach(helpLanguage => {
                        let structure = window.api.parseFile(settingsStore.pathToApp, name, helpLanguage);
                        result.structures[helpLanguage] = structure;
                    });


                    return result;
                });
                this.fileList = fileList.map(item => item.name);
                let languageList = [
                    'english',
                    settingsStore.language,
                    ...settingsStore.helpLanguages,
                ]
                this.dataByFile = fileList.reduce((acc, fileData) => {
                    let keys = fileData.structures.english.data.map(item => item.key);
                    let dataByKey = {};
                    let fileDataGroupedByKeys = {};
                    languageList.forEach(language => {
                        fileDataGroupedByKeys[language] = _.groupBy(fileData.structures[language].data, 'key');
                    });
                    keys.forEach(key => {
                        let data = {};
                        languageList.forEach(language => {
                            data[language] = fileDataGroupedByKeys[language][key] ? fileDataGroupedByKeys[language][key][0] : undefined;
                        });
                        dataByKey[key] = data;
                    });
                    return {
                        ...acc,
                        [fileData.name]: dataByKey,
                    }
                }, {});

                this.isErrorWithList = false;
            } catch (error) {
                this.isErrorWithList = true;
                console.log(error);
            }
        }
    }
});