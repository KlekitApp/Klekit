import { useProjectsStore } from '../stores/projects';

const routes = [

  {
    path: '/',
    component: () => import('layouts/ProjectLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ProjectPage/ProjectPage.vue') }
    ]
  },
  {
    path: '/translator',
    component: () => import('layouts/TranslatorLayout.vue'),
    children: [
      {
        path: ':projectId',
        component: () => import('src/pages/TranslatorPage/TranslatorPage.vue'),
        beforeEnter(to, from, next) {
          if (to.params.projectId) {
            let projectStore = useProjectsStore()
            projectStore.activeProjectId = to.params.projectId;
          
            next();
          } else {
            next('');
          }
        }
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
