<template>
  <q-page class="flex flex-center">
    <nothing-to-translate v-if="isErrorWithList" />
    <translation-editor v-else></translation-editor>
  </q-page>
  <settings-dialog></settings-dialog>
</template>

<script>
import SettingsDialog from '../components/SettingsDialog.vue';
import NothingToTranslate from '../components/NothingToTranslate.vue';
import TranslationEditor from '../components/TranslationEditor/TranslationEditor.vue';
import { useStructureStore } from 'src/stores/structure';
import { mapState } from 'pinia';

export default {
  name: 'IndexPage',
  computed: {
    ...mapState(useStructureStore, ['isErrorWithList'])
  },
  components: {
    SettingsDialog,
    NothingToTranslate,
    TranslationEditor
  },
}
</script>
