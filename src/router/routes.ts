// 对外暴露路由配置（常量路由）
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', // 命名路由
  },
  // 登录成功以后展示数据的路由
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout', // 命名路由
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404', // 命名路由
  },
  // 以上路由都没有匹配上的任意路由，就让重定向到404页面
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
