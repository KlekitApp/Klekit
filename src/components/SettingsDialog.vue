<template>
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Translate Language</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="language" autofocus @keyup.enter="save" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Help Language</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="helpLanguage" @keyup.enter="save" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Path To Game</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="pathToGame" @keyup.enter="save" />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Google Trandlate Code</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="googleTranslateCode" @keyup.enter="save" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Ok" v-close-popup @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia';
import { useSettingsStore } from 'src/stores/settings'

export default {
    name: 'SettingsDialog',
    computed: {
      ...mapWritableState(useSettingsStore, ['language', 'helpLanguage', 'pathToGame', 'googleTranslateCode', 'isDialogOpen']),
    },
    methods: {
      ...mapActions(useSettingsStore, ['save']),
    }
};
</script>