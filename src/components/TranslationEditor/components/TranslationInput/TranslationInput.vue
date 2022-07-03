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
                color="primary"
                @click="saveTranslation" 
            > Save </q-btn>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'pinia';
import MetadataInput from './components/MetadataInput.vue';
import ValueInput from './components/ValueInput.vue';
import { useTranslatorStore } from 'src/stores/translator';


export default {
    methods: {
        ...mapActions(useTranslatorStore, ['saveTranslation']),
    },
    components: {
        MetadataInput,
        ValueInput
    }
}
</script>