import { defineStore } from 'pinia';
import { useStructureStore } from './structure';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    helpLanguage: localStorage.getItem('helpLanguage') || 'english',
    language: localStorage.getItem('language') || 'ukrainian',
    googleTranslateCode: localStorage.getItem('googleTranslateCode') || '',
    pathToGame: localStorage.getItem('pathToGame') || '',
    isDialogOpen: false,
  }),
  actions: {
    save() {
      const structureStore = useStructureStore();
      localStorage.setItem('helpLanguage', this.helpLanguage);
      localStorage.setItem('language', this.language);
      localStorage.setItem('googleTranslateCode', this.googleTranslateCode);
      localStorage.setItem('pathToGame', this.pathToGame);
      structureStore.fetch();
      this.isDialogOpen = false;
    }
  },
});
