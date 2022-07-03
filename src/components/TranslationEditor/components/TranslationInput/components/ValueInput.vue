<template>
    <q-input
        :modelValue="activeValue"
        @update:modelValue="inputActiveValue"
        debounce="500"
        filled
        dense
        :label="activeKey"
        type="textarea"></q-input>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useTranslatorStore } from 'src/stores/translator'

export default {
    computed: {
        ...mapState(useTranslatorStore, ['activeKey']),
        ...mapWritableState(useTranslatorStore, ['activeValue']),
    },
    methods: {
        ...mapActions(useTranslatorStore, ['setCurrentStructure']),
        inputActiveValue (value) {
            this.activeValue = value;
            this.setCurrentStructure();
        }
    },
}
</script>