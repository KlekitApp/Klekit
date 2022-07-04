import { defineStore } from "pinia";


export const useSettingsStore = defineStore('projects', {
    state: () => ({
        projects: [],
    })
});