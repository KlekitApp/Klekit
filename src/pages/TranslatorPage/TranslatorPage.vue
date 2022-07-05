<template>
  <q-page class="flex flex-center">
    <nothing-to-translate v-if="isErrorWithList" />
    <translation-editor v-else-if="activeFile"></translation-editor>
    <no-active-file v-else />
  </q-page>
</template>

<script>
import NothingToTranslate from './components/NothingToTranslate.vue';
import TranslationEditor from './components/TranslationEditor/TranslationEditor.vue';
import NoActiveFile from './components/NoActiveFile.vue';
import { useStructureStore } from 'src/stores/structure';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'IndexPage',
  computed: {
    ...mapState(useStructureStore, ['isErrorWithList', 'activeFile'])
  },
  methods: {
    ...mapActions(useStructureStore, ['fetch', 'reset']),
  },
  mounted() {
    this.fetch();
  },
  unmounted() {
    this.reset();
  },
  components: {
    NothingToTranslate,
    TranslationEditor,
    NoActiveFile
  },
}
</script>
