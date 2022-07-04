<template>
  <q-page class="fullscreen flex flex-center">
    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>Projects:</q-item-label>
      <div v-for="(project, key) in projects" :key="key">
        <q-item>
            <q-item-section avatar top>
            <q-avatar v-if="parser[project.parser]?.icon" size="64" src="https://cdn.vuetifyjs.com/images/logo.png" />
            <q-icon v-else name="account_tree" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
            <q-item-label lines="1">
                <span class="text-weight-medium">{{project.name}}</span>
                <span class="text-grey-8"> - {{project.id}}</span>
            </q-item-label>
            <q-item-label caption lines="1">
                {{parser[project.parser]?.name || 'NO PARSER PROVIDED'}}
            </q-item-label>
            </q-item-section>

            <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="settings" />
            </div>
            </q-item-section>
        </q-item>

        <q-separator v-if="key !== projects.length-1" spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { mapState } from 'pinia';
import { useProjectsStore } from 'src/stores/projects';

export default {
    name: 'ProjectPage',
    computed: {
        ...mapState(useProjectsStore, ['projects', 'parser']),
    },
}
</script>