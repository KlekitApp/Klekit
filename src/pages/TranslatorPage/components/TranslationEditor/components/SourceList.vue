<template>
    <q-list separator class="absolute-full">
        <q-item v-for="(language, index) in sourceLanguages" :key="index">
            <q-item-section>
                <q-item-label class="text-h6">{{activeFileData[language]?.[activeKey]?.value || 'NO VALUE FOR THIS LANGUAGE'}}</q-item-label>
                <q-item-label caption>{{language}}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script>
import { useStructureStore } from 'src/stores/structure';
import { useTranslatorStore } from 'src/stores/translator';
import { mapState } from 'pinia';
import { useProjectsStore } from 'src/stores/projects';

export default {
    name: 'SourceList',
    computed: {
      ...mapState(useStructureStore, ['activeFile', 'activeFileData']),
      ...mapState(useTranslatorStore, ['activeKey']),
      ...mapState(useProjectsStore, ['sourceLanguages']),
    },
}
</script>