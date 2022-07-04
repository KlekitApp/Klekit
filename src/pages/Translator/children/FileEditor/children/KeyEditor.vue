<template>
    <SourceList/>
    <q-footer bordered class="bg-white text-black">
        <TranslationInput />
    </q-footer>
</template>

<script>
import { mapState } from 'pinia';
import SourceList from './components/SourceList.vue';
import TranslationInput from './components/TranslationInput/TranslationInput.vue';
import { useTranslatorStore } from 'src/stores/translator';
import NoActiveKey from '../NoActiveKey.vue';
import AllTranslated from '../AllTranslated.vue';
import { useStructureStore } from 'src/stores/structure';
export default {
    computed: {
        ...mapState(useStructureStore, ['activeFile', 'translatedPercentageByFile']),
    },
    components: {
        SourceList,
        TranslationInput,
        NoActiveKey,
        AllTranslated
    }
}
</script>