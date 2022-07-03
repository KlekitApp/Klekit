import { defineStore } from 'pinia';
import { useStructureStore } from './structure';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    baseLanguage: localStorage.getItem('baseLanguage') || 'english',
    helpLanguages: JSON.parse(localStorage.getItem('helpLanguages') || '[]'),
    language: localStorage.getItem('language') || 'ukrainian',
    googleTranslateCode: localStorage.getItem('googleTranslateCode') || '',
    pathToApp: localStorage.getItem('pathToApp') || '',
    isDialogOpen: false,
    parserSettings: {},
  }),
  getters: {
    sourceLanguages: state => {
      return [
        state.baseLanguage,
        ...state.helpLanguages
      ]
    }
  },
  actions: {
    save() {
      const structureStore = useStructureStore();
      localStorage.setItem('baseLanguage', this.baseLanguage);
      localStorage.setItem('helpLanguages', JSON.stringify(this.helpLanguages));
      localStorage.setItem('language', this.language);
      localStorage.setItem('googleTranslateCode', this.googleTranslateCode);
      localStorage.setItem('pathToApp', this.pathToApp);
      structureStore.fetch();
      this.isDialogOpen = false;
    }
  },
});
