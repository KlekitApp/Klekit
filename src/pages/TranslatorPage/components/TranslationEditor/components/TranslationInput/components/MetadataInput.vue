<template>
    <q-input
        v-for="key in (parser?.metaKeys)"
        :key="key"
        :model-value="activeMeta[key] || ''"
        @update:model-value="value => inputActiveMeta(value, key)"
        debounce="500"
        filled
        :label="key"></q-input>
</template>

<script>
import { useTranslatorStore } from 'src/stores/translator'
import { mapActions, mapState } from 'pinia'
import { useProjectsStore } from 'src/stores/projects'
export default {
    computed: {
        ...mapState(useTranslatorStore, ['activeMeta']),
        ...mapState(useProjectsStore, ['parser']),
    },
    methods: {
        ...mapActions(useTranslatorStore, ['inputActiveMeta', 'setCurrentStructure']),
        inputActiveMeta(value, key) {
            this.activeMeta[key] = value;
            this.setCurrentStructure();
        }
    }
}
</script>