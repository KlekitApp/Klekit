import { defineStore } from "pinia";

export const useTranslatorStore = defineStore("translator", {
    state: () => ({
        activeKey: '',
    }),
    actions: {
        saveTranslation() {
            let structureStore = useStructureStore();
            
            structureStore.saveActiveFile();
        }
    }
});