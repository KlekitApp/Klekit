<template>
    <div class="absolute-full flex flex-center">
        <no-active-key v-if="!activeKey && translatedPercentageByFile[activeFile]<100" />
        <all-translated v-if="!activeKey && translatedPercentageByFile[activeFile] === 100" />
    </div>
    <SourceList v-if="activeKey" />
    <q-footer bordered class="bg-white text-black" v-if="activeKey">
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
        ...mapState(useTranslatorStore, ['activeKey']),
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