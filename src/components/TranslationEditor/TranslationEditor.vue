<template>
    <SourceList v-if="activeKey" />
    <q-footer elevated v-if="activeKey">
        <TranslationInput />
    </q-footer>
</template>

<script>
import { mapState } from 'pinia';
import SourceList from './components/SourceList.vue';
import TranslationInput from './components/TranslationInput/TranslationInput.vue';
import { useTranslatorStore } from 'src/stores/translator';
export default {
    computed: {
        ...mapState(useTranslatorStore, ['activeKey']),
    },
    components: {
        SourceList,
        TranslationInput
    }
}
</script>