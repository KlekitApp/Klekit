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
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useLoaderStore } from 'src/stores/loader';

export default {
  name: 'IndexPage',
  computed: {
    ...mapState(useStructureStore, ['isErrorWithList', 'activeFile']),
    ...mapWritableState(useLoaderStore, ['isLoading']),
  },
  methods: {
    ...mapActions(useStructureStore, ['fetch', 'reset']),
  },
  mounted() {
    setTimeout(() => {
      this.fetch();
      this.isLoading = false;
    }, 0);
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
