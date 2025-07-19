import { createRouter, createWebHistory } from 'vue-router'

// Simple views for demo
const DashboardView = () => import('@/views/DashboardView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/'
    }
  ]
})

export default router