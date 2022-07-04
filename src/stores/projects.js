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
        parser: state => state.parsers.find(parser => parser.id === state.projects[state.activeProjectId]?.parser),
        sourceLanguages: state => [
            this.language,
            this.baseLanguage,
            ...this.helpLanguages
        ],
    },
    actions: {
        fetchProjects() {
            this.projects = windows.api.getProjects();
            this.parsers = windows.api.getParsers();
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
            projects[editedProject.id] = editedProject;
            window.api.saveProject(project);
            this.closeDialog();
        },
        deleteProject(id) {
            delete projects[id];
            window.api.deleteProject(id);
        }
    },
});
