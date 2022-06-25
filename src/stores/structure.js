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
                    if (state.dataByFile[file][key][settingsStore.language]) {
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

                let fileList = window.api.getAllFileNamesSync(settingsStore.pathToGame + '/game/localization/english');
                fileList = fileList.map(item => {
                    let name = item.replace(settingsStore.pathToGame + '/game/localization/english/', '').replace('_l_english.yml', '');
                    let englishStructure = window.api.parseFile(item);
                    let languageStructure = window.api.parseFile(settingsStore.pathToGame + '/game/localization/' + settingsStore.language + '/' + name + '_l_' + settingsStore.language + '.yml');
                    let helpLanguageStructure = window.api.parseFile(settingsStore.pathToGame + '/game/localization/' + settingsStore.helpLanguage + '/' + name + '_l_' + settingsStore.helpLanguage + '.yml');
                    
                    return {
                        name,
                        structures: {
                            english: englishStructure,
                            [settingsStore.language]: languageStructure,
                            [settingsStore.helpLanguage]: helpLanguageStructure,
                        }
                    }
                });
                this.fileList = fileList.map(item => item.name);
                this.dataByFile = fileList.reduce((acc, fileData) => {
                    let englishDataByKey = _.groupBy(fileData.structures.english.data, 'key');
                    let languageDataByKey = _.groupBy(fileData.structures[settingsStore.language].data, 'key');
                    let helpLanguageDataByKey = _.groupBy(fileData.structures[settingsStore.helpLanguage].data, 'key');
                    let dataByKey = {};
                    Object.keys(englishDataByKey).forEach(key => {
                        dataByKey[key] = {
                            english: englishDataByKey[key][0],
                            [settingsStore.language]: languageDataByKey[key] ? languageDataByKey[key][0] : null,
                            [settingsStore.helpLanguage]: helpLanguageDataByKey[key] ? helpLanguageDataByKey[key][0] : null,
                        }
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