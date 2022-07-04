import { defineStore } from "pinia";
import { useProjectsStore } from "./projects";
import { useStructureStore } from "./structure";
import { toRaw } from "vue";
import _ from "lodash";

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
            const projectsStore = useProjectsStore();

            let structure = toRaw(structureStore.activeFileData[projectsStore.language] || {});
            if (!!this.activeKey && !!this.activeValue) {
                structure[this.activeKey] = {
                    ...toRaw(structureStore.activeFileData[projectsStore.baseLanguage][this.activeKey]),
                    value: this.activeValue,
                    meta: toRaw(this.activeMeta)
                };
            }

            this.currentStructure = structure;

            this.rawFile = window.api.stringifyStructure({
                data: toRaw(structure),
                comments: toRaw(structureStore.comments[structureStore.activeFile]),
                meta: toRaw(structureStore.parserMeta[structureStore.activeFile])
            }, projectsStore.language);
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
            let projectsStore = useProjectsStore();

            let structure = toRaw(structureStore.activeFileData[projectsStore.language] || {});
            let baseStructure = toRaw(structureStore.activeFileData[projectsStore.baseLanguage] || {});

            let keys = Object.keys(structure);
            let baseKeys = Object.keys(baseStructure);

            let firstUntranslatedKey = _.differenceBy(baseKeys, keys).shift();
            
            if (!!firstUntranslatedKey) {
                this.changeActiveKey(firstUntranslatedKey);
            }
        },
        changeActiveKey(key) {
            let structureStore = useStructureStore();
            let projectsStore = useProjectsStore();

            this.activeKey = key;
            this.activeValue = toRaw(structureStore.activeFileData[projectsStore.language]?.[key]?.value || '');
            this.activeMeta = toRaw(structureStore.activeFileData[projectsStore.language]?.[key]?.meta || {});
            
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