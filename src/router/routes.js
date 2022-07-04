
const routes = [
  {
    path: '/translator',
    component: () => import('pages/Translator.vue'),
    children: [
      { path: '', component: () => import('pages/Translator/children/NoActiveFile.vue') },
      { 
        path: '/:fileName/editor',
        component: () => import('pages/Translator/children/FileEditor/FileEditor'),
        children: [
          { path: '', component: () => import('pages/Translator/children/FileEditor/children/NoActiveKey.vue') },
          { path: '/all-translated', component: () => import('pages/Translator/children/FileEditor/children/AllTranslated.vue') },
          { path: '/key/:key', component: () => import('pages/Translator/children/FileEditor/children/KeyEditor.vue') },
        ]
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/error/nothing-to-translate',
    component: () => import('src/pages/Errors/NothingToTranslate.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/Errors/ErrorNotFound.vue')
  }
]

export default routes
