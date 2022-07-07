<template>
    <q-input
        :modelValue="activeValue"
        @update:modelValue="inputActiveValue"
        debounce="200"
        autofocus
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

export default {
    // data() {
    //     return {
    //         placeholder: '',
    //     }
    // },
    computed: {
        ...mapState(useTranslatorStore, ['activeKey', 'activeFileData']),
        ...mapState(useProjectsStore, ['baseLanguage']),
        ...mapState(useStructureStore, ['dataByKeys']),
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
        // async translateText (value) {
        //     this.placeholder = 'Translating...';

        //     const options = {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json',
        //             'X-RapidAPI-Key': 'SmcdXvtM5VmshxJqSxTumLYwVjQTp1KeOIZjsnIpVcDbOX5MLH',
        //             'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        //         },
        //         body: {"q":this.dataByKeys[value].language[this.baseLanguage],"source":"en","target":"uk"}
        //     };
        //     let res = await fetch('https://deep-translate1.p.rapidapi.com/language/translate/v2', options);
        //     console.log(res);
        //     this.placeholder = (await res.json())?.['data']?.['translations']?.[0]?.['translatedText'] || '';
        // }
    },
    // watch: {
    //     activeKey (value) {
    //         setTimeout(() => {
    //             this.translateText(value);
    //         }, 0);
    //     }
    // }
}
</script>