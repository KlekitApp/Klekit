<template>
  <q-page class="flex flex-center">
    <nothing-to-translate v-if="isErrorWithList" />
    <translation-editor v-else-if="activeFile"></translation-editor>
    <no-active-file v-else />
  </q-page>
  <settings-dialog></settings-dialog>
</template>

<script>
import SettingsDialog from './components/SettingsDialog.vue';
import NothingToTranslate from './components/NothingToTranslate.vue';
import TranslationEditor from './components/TranslationEditor/TranslationEditor.vue';
import NoActiveFile from './components/NoActiveFile.vue';
import { useStructureStore } from 'src/stores/structure';
import { mapState } from 'pinia';

export default {
  name: 'IndexPage',
  computed: {
    ...mapState(useStructureStore, ['isErrorWithList', 'activeFile'])
  },
  components: {
    SettingsDialog,
    NothingToTranslate,
    TranslationEditor,
    NoActiveFile
  },
}
</script>
