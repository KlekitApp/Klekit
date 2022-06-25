import { defineStore } from "pinia";

export const useTranslatorStore = defineStore("translator", {
    state: () => ({
        activeKey: '',
    }),
});