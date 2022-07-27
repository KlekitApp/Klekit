<template>
    <q-input
        :modelValue="activeValue"
        @update:modelValue="inputActiveValue"
        debounce="200"
        autofocus
        :placeholder="placeholder"
        rows="1"
        filled
        autogrow
        :label="activeKey"
        @keydown.tab.prevent="setTranslationAsActive"
        type="textarea"></q-input>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useTranslatorStore } from 'src/stores/translator'
import { useProjectsStore } from 'src/stores/projects'
import { useStructureStore } from 'src/stores/structure'
import { toRaw } from 'vue-demi'

export default {
    data() {
        return {
            placeholder: '',
        }
    },
    computed: {
        ...mapState(useTranslatorStore, ['activeKey']),
        ...mapState(useProjectsStore, ['baseLanguage', 'autotranslation']),
        ...mapState(useStructureStore, ['activeFileData']),
        ...mapWritableState(useTranslatorStore, ['activeValue'])
    },
    methods: {
        ...mapActions(useTranslatorStore, ['setCurrentStructure']),
        inputActiveValue (value) {
            this.activeValue = value;
            this.setCurrentStructure();
        },
        setTranslationAsActive () {
            if (this.activeValue === '' && this.placeholder !== 'Translating...') {
                this.activeValue = this.placeholder;
            }
        },
        async translateText (value) {
            console.log('translateText', value);
            console.log('translateText', this.autotranslation);
            if (this.autotranslation?.active && this.activeFileData?.[this.autotranslation.language]?.[value]?.value !== '') {
                this.placeholder = 'Translating...';
                this.placeholder = (await window.api.translate({
                    ...toRaw(this.autotranslation),
                    text: this.activeFileData[this.autotranslation.language][value].value
                })) || '';
            }
        }
    },
    watch: {
        activeKey (value) {
            setTimeout(() => {
                this.translateText(value);
            }, 0);
        }
    }
}
</script>