import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Trials from '../components/Trials.vue'
import Details from '../components/Details.vue'
import NotFound from '../components/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/trials', component: Trials },
  {
    path: '/trials/:id',
    name: 'details',
    component: Details,
    props: true
  },
  { path: '/:pathMatch(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
