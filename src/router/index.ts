import { createRouter, createWebHashHistory } from 'vue-router'
// type 表示导入的是类型文件
import type { RouteRecordRaw } from 'vue-router'

import sessionCache from '@/utils/sessioncache'
import { firstMenu } from '@/utils/map-menu'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue'),
    children: []
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

// 路由跳转拦截守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = sessionCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }

  if (to.path === '/main') {
    console.log(firstMenu)
    return firstMenu.url
  }
})

export default router
