<template>
  <q-page class="fullscreen">
    <q-list separator class="fullscreen">
      <q-item-label header>Projects<q-btn class="gt-xs" size="12px" flat dense round icon="add" @click="() => {editOrCreateProject()}" /></q-item-label>
      <div v-for="(project, key, index) in projects" :key="key">
        <q-item>
            <q-item-section avatar top>
            <q-avatar v-if="project.parser?.icon" size="64" src="https://cdn.vuetifyjs.com/images/logo.png" />
            <q-icon v-else name="account_tree" color="black" size="34px" />
            </q-item-section>

            <q-item-section top>
            <q-item-label lines="1">
                <span class="text-weight-medium">{{project.name}}</span>
                <span class="text-grey-8"> - {{project.parser?.name || 'NO PARSER PROVIDED'}}</span>
            </q-item-label>
            <q-item-label caption lines="1">
                {{project.id}}
            </q-item-label>
            </q-item-section>

            <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete" @click="() => {deleteProject(project.id)}" />
              <q-btn class="gt-xs" size="12px" flat dense round icon="settings" @click="() => {editOrCreateProject(project.id)}" />
              <q-btn class="gt-xs" size="12px" :to="'/translator/'+project.id" flat dense round icon="arrow_forward_ios" />
            </div>
            </q-item-section>
        </q-item>
        <q-separator v-if="index != Object.keys(projects).length - 1" spaced />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useProjectsStore } from 'src/stores/projects';

export default {
    name: 'ProjectPage',
    computed: {
        ...mapState(useProjectsStore, ['projects', 'getParserById']),
    },
    methods: {
        ...mapActions(useProjectsStore, ['editOrCreateProject', 'fetchProjects', 'deleteProject']),
    },
    mounted () {
        this.fetchProjects();
    },
}
</script>