import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import LoginPage from '@/views/LoginPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },

  // หน้า login ต้องอยู่ระดับหลัก
  {
    path: '/login',
    component: LoginPage,
  },

  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

import { authService } from '@/auth/auth-service';

router.beforeEach(async (to) => {
  const user = await authService.getCurrentUser();

  if (to.path === "/login" && user) {
    return "/tabs/tab1";
  }

  if (to.meta.requiresAuth && !user) {
    return "/login";
  }

  return true;
});

export default router
