<template>
    <q-input
        ref="input"
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
        @keydown.enter.shift.exact.prevent="saveTranslation"
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
        ...mapActions(useTranslatorStore, ['setCurrentStructure', 'saveTranslation']),
        inputActiveValue (value) {
            this.activeValue = value;
            this.setCurrentStructure();
        },
        setTranslationAsActive () {
            if (this.activeValue === '' && this.placeholder !== 'Translating...') {
                this.inputActiveValue(this.placeholder);
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
        },
        focuseOnInput () {
            this.$refs.input.focus();
        }
    },
    mounted () {
        this.translateText(this.activeKey);
    },
    watch: {
        activeKey (value) {
            setTimeout(() => {
                this.translateText(value);
                this.focuseOnInput();
            }, 0);
        }
    }
}
</script>