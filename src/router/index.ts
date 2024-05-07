import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/register'
    },
    {
      path: '/main',
      name: 'main',

      // meta: {
      //   requireAuth: true
      // },
      component: () => import('../views/main.vue'),
      children: [
        {
          path: '/main',
          redirect: '/main/meetingList'
        },
        {
          path: '/meetingList',

          component: () => import('../components/meeting-list.vue')
        },
        {
          path: '/bookingHistory',
          component: () => import('../components/bookingHistory.vue')
        }
      ]
    },
    {
      path: '/login',

      component: () => import('../views/login.vue')
    },
    {
      path: '/emailLogin',

      component: () => import('../views/eamilLogin.vue')
    },
    {
      path: '/register',
      component: () => import('../views/register.vue')
    },
    {
      path: '/updatePassword',
      component: () => import('../views/updatePassword.vue')
    },
    {
      path: '/errorPage',
      component: () => import('../views/errorPage.vue')
    },

    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/errorPage.vue')
    }
  ]
})

// 设置前置路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = localStorage.getItem('access_token')
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

// 动态添加路由
const routerLists = [
  {
    path: '/main/updateUserInfo',
    component: () => import('../components/updateUserInfo.vue')
  },
  {
    path: '/main/meetingList',
    component: () => import('../components/meeting-list.vue')
  }
]
for (const [index, value] of Object.entries(routerLists)) {
  router.addRoute('main', routerLists[index as any])
}

export default router
