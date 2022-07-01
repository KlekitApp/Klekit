import { defineStore } from 'pinia';
import { useStructureStore } from './structure';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    helpLanguages: JSON.parse(localStorage.getItem('helpLanguages') || '[]'),
    language: localStorage.getItem('language') || 'ukrainian',
    googleTranslateCode: localStorage.getItem('googleTranslateCode') || '',
    pathToApp: localStorage.getItem('pathToApp') || '',
    isDialogOpen: false,
  }),
  actions: {
    save() {
      const structureStore = useStructureStore();
      localStorage.setItem('helpLanguages', JSON.stringify(this.helpLanguages));
      localStorage.setItem('language', this.language);
      localStorage.setItem('googleTranslateCode', this.googleTranslateCode);
      localStorage.setItem('pathToApp', this.pathToApp);
      structureStore.fetch();
      this.isDialogOpen = false;
    }
  },
});
