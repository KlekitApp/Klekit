<template>
    <div class="row">
        <div class="col-10">
            <value-input />
            <metadata-input />
        </div>
        <div class="col-2">
            <q-btn
                flat
                dense
                @click="saveTranslation" 
            > Save </q-btn>
            <q-checkbox
                v-model="isAutoNext"
                label="Auto Next"
                dense />

        </div>
    </div>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import MetadataInput from './components/MetadataInput.vue';
import ValueInput from './components/ValueInput.vue';
import { useTranslatorStore } from 'src/stores/translator';


export default {
    computed: {
        ...mapWritableState(useTranslatorStore, ['isAutoNext']),
    },
    methods: {
        ...mapActions(useTranslatorStore, ['saveTranslation']),
    },
    components: {
        MetadataInput,
        ValueInput
    }
}
</script>