import { defineStore } from "pinia";
import { useSettingsStore } from "./settings";
import { useStructureStore } from "./structure";
import { toRaw } from "vue";
import _, { differenceBy } from "lodash";

export const useTranslatorStore = defineStore("translator", {
    state: () => ({
        activeKey: '',
        activeValue: '',
        activeMeta: {},
        currentStructure: {},
        rawFile: '',
        isAutoNext: true,
    }),
            
    actions: {
        setCurrentStructure() {
            const structureStore = useStructureStore();
            const settingsStore = useSettingsStore();

            let structure = toRaw(structureStore.activeFileData[settingsStore.language] || {});
            if (!!this.activeKey && !!this.activeValue) {
                structure[this.activeKey] = {
                    ...toRaw(structureStore.activeFileData[settingsStore.baseLanguage][this.activeKey]),
                    value: this.activeValue,
                    meta: toRaw(this.activeMeta)
                };
            }

            this.currentStructure = structure;

            this.rawFile = window.api.stringifyStructure({
                data: toRaw(structure),
                comments: toRaw(structureStore.comments[structureStore.activeFile]),
                meta: toRaw(structureStore.parserMeta[structureStore.activeFile])
            }, settingsStore.language);
        },
        saveTranslation() {
            let structureStore = useStructureStore();
            
            structureStore.saveActiveFile();
            if (this.isAutoNext) {
                this.goToFirstUntranslatedKey();
            }
        },
        goToFirstUntranslatedKey() {
            let structureStore = useStructureStore();
            let settingsStore = useSettingsStore();

            let structure = toRaw(structureStore.activeFileData[settingsStore.language] || {});
            let baseStructure = toRaw(structureStore.activeFileData[settingsStore.baseLanguage] || {});

            let keys = Object.keys(structure);
            let baseKeys = Object.keys(baseStructure);

            let firstUntranslatedKey = _.differenceBy(baseKeys, keys).shift();

            this.changeActiveKey(firstUntranslatedKey);
        },
        changeActiveKey(key) {
            let structureStore = useStructureStore();
            let settingsStore = useSettingsStore();

            this.activeKey = key;
            this.activeValue = toRaw(structureStore.activeFileData[settingsStore.language]?.[key]?.value || '');
            this.activeMeta = toRaw(structureStore.activeFileData[settingsStore.language]?.[key]?.meta || {});
            
            this.setCurrentStructure();
        },
        reset() {
            this.activeKey = '';
            this.activeValue = '';
            this.activeMeta = {};
            this.setCurrentStructure();
        }
    }
});