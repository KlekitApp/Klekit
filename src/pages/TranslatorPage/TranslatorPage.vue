<template>
  <q-page>
    <div class="absolute-full flex flex-center">
      <nothing-to-translate v-if="isErrorWithList" />
      <no-active-file v-else-if="!activeFile" />
    </div>
    <translation-editor v-if="activeFile && !isErrorWithList"></translation-editor>
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
