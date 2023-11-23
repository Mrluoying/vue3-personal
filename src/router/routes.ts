// 对外暴露路由配置（常量路由）
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  // 登录成功以后展示数据的路由
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout', // 命名路由
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
      {
        path: 'test',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页测试',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', // 命名路由
    meta: {
      title: '404页面',
      hidden: true,
    },
  },
  // 以上路由都没有匹配上的任意路由，就让重定向到404页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意页面',
      hidden: true,
    },
  },
]
