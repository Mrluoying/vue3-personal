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
      // 将title注释掉，面包屑通过是否有title来控制展示
      // title: '首页',
      icon: 'home',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'search',
        },
      },
    ],
  },
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'screen', // 命名路由
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'screen',
    },
  },
  {
    path: '/acl/',
    component: () => import('@/layout/index.vue'),
    name: 'acl', // 命名路由
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'authority',
    },
    redirect: '/acl/userManagement',
    children: [
      {
        path: 'userManagement',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'user', // 命名路由
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'userManagement',
        },
      },
      {
        path: 'roleManagement',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'role', // 命名路由
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'role',
        },
      },
      {
        path: 'menuManagement',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'menu', // 命名路由
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'menu',
        },
      },
    ],
  },
  {
    path: '/product/',
    component: () => import('@/layout/index.vue'),
    name: 'product', // 命名路由
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'product',
    },
    // 添加一个重定向地址，为了点击面包屑一级路由的时候，跳到该一级路由下二级路由的第一个
    // 要不然跳转的是一个layout空白的页面（@/layout/index.vue）
    redirect: '/acl/trademark',
    children: [
      {
        path: 'trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'trademark', // 命名路由
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'trademark',
        },
      },
      {
        path: 'attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'attr', // 命名路由
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'attr',
        },
      },
      {
        path: 'spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'spu', // 命名路由
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'spu',
        },
      },
      {
        path: 'sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'sku', // 命名路由
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'sku',
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
