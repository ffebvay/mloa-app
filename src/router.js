import Vue from 'vue'
import Router from 'vue-router'

import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ChooseAction from './components/ChooseAction'
import SelectActivity from './components/SelectActivity'
import CreateTask from './components/CreateTask'
import UserProfile from './components/UserProfile'
import SocialFeed from './components/SocialFeed'
import About from './components/About'

Vue.use(Router)

const router = new Router({
  routes: [
      { path: '/', component: HomePage },
      { path: '/login', component: LoginPage },
      { path: '/register', component: RegisterPage },
      { path: '/task', component: CreateTask },
      {
          path: '/choose',
          name: 'action',
          component: ChooseAction
      },
      {
          path: '/select',
          name: 'select',
          component: SelectActivity,
          props: { default: true }
      },
      {
          path: '/profile',
          name: 'profile',
          component: UserProfile,
          props: { default: true }
      },
      {
          path: '/feed',
          name: 'feed',
          component: SocialFeed
      },
      {
          path: '/about',
          name: 'about',
          component: About
      },

      // otherwise redirect to home
      { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('user')

    if (authRequired && !loggedIn) {
        return next('/login')
    }

    next()
})

export default router
