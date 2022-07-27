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

        <q-card-section class="q-pt-none" v-if="editedProject.autotranslation">
          <q-expansion-item
            v-model="editedProject.autotranslation.active"
            expand-icon="none"
            expanded-icon="none"
          >
            <template v-slot:header>
              <q-item-section avatar>
                <q-icon name="translate" />
              </q-item-section>

              <q-item-section>
                Auto-translation helper
              </q-item-section>

              <q-item-section side>
                <q-toggle v-model="editedProject.autotranslation.active" />
              </q-item-section>
            </template>
            <q-card>
              <q-card-section class="q-pt-none">
                <q-select
                  v-model="editedProject.autotranslation.language"
                  :options="[editedProject.baseLanguage,...editedProject.helpLanguages]"
                  label="From Language Source" />
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-input
                  label="From (code)"
                  v-model="editedProject.autotranslation.from"
                  autofocus
                  @keyup.enter="saveProject"
                />
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-input
                  label="To (code)"
                  v-model="editedProject.autotranslation.to"
                  autofocus
                  @keyup.enter="saveProject"
                />
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-select
                  v-model="editedProject.autotranslation.engine"
                  :options="engineOptions"
                  label="Engine" />
              </q-card-section>
              <q-card-section class="q-pt-none">
                <q-input
                  label="API Key"
                  v-model="editedProject.autotranslation.key"
                  autofocus
                  @keyup.enter="saveProject"
                />
              </q-card-section>
            </q-card>
          </q-expansion-item>
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
    data() {
        return {
            expanded: false,
            engineOptions: [
              "google",
              "libre", 
              "deepl"
            ]
        };
    },
    computed: {
      ...mapWritableState(useProjectsStore, ['editedProject', 'isDialogOpen']),
      ...mapState(useProjectsStore, ['parsers']),
    },
    methods: {
      ...mapActions(useProjectsStore, ['saveProject']),
    }
};
</script>