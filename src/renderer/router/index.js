import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/pages/LoginPage').default
    },
    {
      path: '/projects',
      name: 'project-list-page',
      component: require('@/pages/ProjectListPage').default
    },
    {
      path: '/editor',
      name: 'image-editor-page',
      component: require('@/pages/ImageEditorPage').default
    },
    {
      path: '/screens',
      name: 'screen-list-page',
      component: require('@/pages/ScreenListPage').default
    },
    {
      path: '/issue/{id}',
      name: 'issue-form-page',
      component: require('@/pages/IssueFormPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
