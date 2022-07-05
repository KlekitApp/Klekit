<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleFileDrawer"
        />

        <q-toolbar-title>
          CK3 Language Editor
        </q-toolbar-title>

        <q-btn
          flat
          label="Back To Projects"
          to="/"
        />
      </q-toolbar>

      <q-bar v-if="!!activeFile" >

        <q-toolbar-title>
          {{activeFile}}{{activeKey ? " : "+activeKey : ''}}
        </q-toolbar-title>
        <q-toolbar-title shrink>
          {{translatedPercentageByFile[activeFile]}}%
        </q-toolbar-title>
        
        <q-btn
          flat
          dense
          round
          icon="key"
          aria-label="Keys"
          @click="toggleFileKeysDrawer"
        />
      </q-bar>
    </q-header>
    <q-drawer
      side="left"
      show-if-above
      v-model="fileDrawerOpen"
      behavior="mobile"
      overlay
      :max-width="300"
      bordered
    >
      <q-list bordered separator>
          <q-item
            v-for="file in fileList"
            :key="file"
            clickable
            dense
            v-ripple
            :active="activeFile === file"
            @click="selectFile(file)"
            active-class="bg-grey">

            <q-item-section>
              <q-item-label class="text-black" caption style="word-break: break-all;">{{file}}</q-item-label>
            </q-item-section>

            <q-item-section side right>
              <q-badge :color="translatedPercentageByFile[file] === 0 ? 'red' : (translatedPercentageByFile[file] === 100 ? 'green' : 'orange')" :label="translatedPercentageByFile[file]+'%'" />
            </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>
    <q-drawer
      side="right"
      show-if-above
      v-model="fileKeysDrawerOpen"
      behavior="mobile"
      overlay
      :max-width="300"
      bordered
    >
      <q-list bordered separator>
          <q-item
            v-for="key in activeFileDataKeys"
            :key="key"
            clickable
            dense
            v-ripple
            :active="activeKey === key"
            @click="selectKey(key)"
            active-class="bg-grey">

            <q-item-section>
              <q-item-label class="text-black" caption style="word-break: break-all;">{{key}}</q-item-label>
            </q-item-section>

            <q-item-section side right>
              <q-badge :color="activeFileData[language]?.[key]?.value ? 'green' : 'red'" />
            </q-item-section>
          </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useProjectsStore } from 'src/stores/projects';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useStructureStore } from 'src/stores/structure';
import { useTranslatorStore } from 'src/stores/translator';

export default {
  name: 'TranslatorLayout',
  data: () => {
    return {
      fileDrawerOpen: false,
      fileKeysDrawerOpen: false,
    }
  },
  computed: {
    ...mapWritableState(useStructureStore, ['activeFile']),
    ...mapWritableState(useTranslatorStore, ['activeKey', 'activeValue']),

    ...mapState(useProjectsStore, ['language']),
    ...mapState(useStructureStore, ['fileList', 'translatedPercentageByFile', 'activeFileData', 'activeFileDataKeys']),
  },
  methods: {
    ...mapActions(useStructureStore, ['changeActiveFile']),
    ...mapActions(useTranslatorStore, ['changeActiveKey']),
    selectFile (name) {
      this.changeActiveFile(name);
      this.fileDrawerOpen = false;
    },
    selectKey (key) {
      this.changeActiveKey(key);
      this.fileKeysDrawerOpen = false;
    },
    toggleFileDrawer () {
      this.fileDrawerOpen = !this.fileDrawerOpen;
    },
    toggleFileKeysDrawer () {
      this.fileKeysDrawerOpen = !this.fileKeysDrawerOpen;
    }
  }
}
</script>
