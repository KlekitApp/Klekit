<template>
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card style="min-width: 350px">

        <q-card-section>
          <div class="text-h6">Settings</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Base Language"
            v-model="baseLanguage"
            autofocus
            @keyup.enter="save"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Translate Language"
            v-model="language"
            autofocus
            @keyup.enter="save"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            label="Help Languages"
            v-model="helpLanguages"
            use-input
            use-chips
            multiple
            hide-dropdown-icon
            input-debounce="0"
            new-value-mode="add-unique"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Path To Game"
            v-model="pathToApp"
            @keyup.enter="save"
          />
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
      ...mapWritableState(useSettingsStore, ['baseLanguage', 'language', 'helpLanguages', 'pathToApp', 'isDialogOpen']),
    },
    methods: {
      ...mapActions(useSettingsStore, ['save']),
    }
};
</script>