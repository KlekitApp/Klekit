import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: {},
        parsers: [],
        activeProjectId: '',
        isDialogOpen: false,
        editedProject: {},
    }),
    getters: {
        language: state => state.projects[state.activeProjectId]?.language || '',
        baseLanguage: state => state.projects[state.activeProjectId]?.baseLanguage || '',
        helpLanguages: state => state.projects[state.activeProjectId]?.helpLanguages || [],
        pathToApp: state => state.projects[state.activeProjectId]?.pathToApp || '',
        project: state => state.projects[state.activeProjectId] || {},
        parser: state => state.parsers.find(parser => parser.id === state.projects[state.activeProjectId]?.parser?.id),
        getParserById: state => id => state.parsers.find(parser => parser.id === id),
        sourceLanguages(state) { 
            return [
                this.baseLanguage,
                ...this.helpLanguages
            ]
    },
    },
    actions: {
        async fetchProjects() {
            this.projects = await window.api.getProjects();
            this.parsers = window.api.getParsers();
        },
        editOrCreateProject(projectId) {
            if (projectId) {
                this.editedProject = toRaw(this.projects[projectId]);
            } else {
                this.editedProject = {
                    id: uuidv4()
                };
            }
            this.isDialogOpen = true;
        },
        closeDialog() {
            this.isDialogOpen = false;
            this.editedProject = {};
        },
        saveProject() {
            let project = toRaw(this.editedProject)
            this.projects[project.id] = project;
            window.api.saveProject(project);
            this.closeDialog();
        },
        deleteProject(id) {
            delete this.projects[id];
            window.api.deleteProject(id);
        }
    },
});
