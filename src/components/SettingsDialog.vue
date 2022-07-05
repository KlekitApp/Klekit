<template>
    <q-dialog v-model="isDialogOpen">
      <q-card style="min-width: 350px">

        <q-card-section>
          <div class="text-h6">Settings</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Name"
            v-model="editedProject.name"
            autofocus
            @keyup.enter="saveProject"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Base Language"
            v-model="editedProject.baseLanguage"
            autofocus
            @keyup.enter="saveProject"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            label="Translate Language"
            v-model="editedProject.language"
            autofocus
            @keyup.enter="saveProject"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            label="Help Languages"
            v-model="editedProject.helpLanguages"
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
            v-model="editedProject.pathToApp"
            @keyup.enter="saveProject"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-select
            v-model="editedProject.parser"
            :options="parsers"
            option-value="id"
            option-label="name"
            label="Parser" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Ok" v-close-popup @click="saveProject" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useProjectsStore } from 'src/stores/projects';

export default {
    name: 'SettingsDialog',
    computed: {
      ...mapWritableState(useProjectsStore, ['editedProject', 'isDialogOpen']),
      ...mapState(useProjectsStore, ['parsers']),
    },
    methods: {
      ...mapActions(useProjectsStore, ['saveProject']),
    }
};
</script>