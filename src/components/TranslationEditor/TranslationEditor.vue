<template>
    <SourceList />
    <q-footer elevated>
        <TranslationInput />
    </q-footer>
</template>

<script>
import { mapState } from 'pinia';
import { useSettingsStore } from 'src/stores/settings';
import { useStructureStore } from 'src/stores/structure';
import { useTranslatorStore } from 'src/stores/translator';

import SourceList from './components/SourceList.vue';
import TranslationInput from './components/TranslationInput/TranslationInput.vue';
export default {
    data: () => {
        return {
            expanded: false
        }
    },
    computed: {
        ...mapState(useTranslatorStore, ['activeKey']),
        ...mapState(useSettingsStore, ['language', 'helpLanguage']),
        ...mapState(useStructureStore, ['activeFileData', 'activeFileDataKeys', 'activeFile'])
    },
    methods: {
        toggleDrawer () {
            this.drawerOpen = !this.drawerOpen;
        },
    },
    components: {
        SourceList,
        TranslationInput
    }
}
</script>