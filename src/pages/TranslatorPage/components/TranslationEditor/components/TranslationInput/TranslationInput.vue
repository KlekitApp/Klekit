<template>
    <div class="row text-black">
        <div class="col-10">
            <q-card class="q-pl-md q-pr-md q-pb-md" flat>
                <q-card-section>
                    <p class="text-grey">{{language}}:</p>
                    <value-input />
                    <p class="q-pt-md text-grey">Meta Data:</p>
                    <metadata-input />
                </q-card-section>
            </q-card>
        </div>
        <div class="col-2 q-pr-md q-pt-md">
            <p class="text-white">Actions:</p>
            <q-btn
                unelevated
                color="green"
                class="full-width"
                @click="saveTranslation" 
            > Save </q-btn>
            <q-checkbox
                v-model="isAutoNext"
                label="Auto Next"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import MetadataInput from './components/MetadataInput.vue';
import ValueInput from './components/ValueInput.vue';
import { useTranslatorStore } from 'src/stores/translator';
import { useProjectsStore } from 'src/stores/projects';


export default {
    computed: {
        ...mapState(useProjectsStore, ['language']),
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