import { defineStore } from "pinia";

export const useLoaderStore = defineStore('loader', {
    state: () => ({
        isLoading: false
    }),
    actions: {
        showLoader() {
            this.isLoading = true;
        }
    }
});