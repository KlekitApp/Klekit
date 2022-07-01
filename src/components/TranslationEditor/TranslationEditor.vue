<template>
    <SourceList />
    <q-footer elevated>
        <TranslationInput />
    </q-footer>
</template>

<script>
import SourceList from './components/SourceList.vue';
import TranslationInput from './components/TranslationInput/TranslationInput.vue';
export default {
    data: () => {
        return {
        }
    },
    components: {
        SourceList,
        TranslationInput
    }
}
</script>