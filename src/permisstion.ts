// 路由鉴权
import router from '@/router'
// npm i --save-dev @types/nprogress 解决nprogress的ts问题
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 禁用nprogress的加载圆圈（在右上角）
nprogress.configure({ showSpinner: false })
import useUserStore from '@/store/modules/user'
// "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
// 这里不引入并把这个当做参数传入会报如上错误（好像是在组件之外使用这个会出现）
import pinia from '@/store'
const userStore = useUserStore(pinia)
console.log(userStore, 'userStore')
// 全局守卫：项目当中任意路由切换都会触发钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // 访问某一个路由之前的守卫
  // to: 将要访问到路由  from: 从哪个路由跳转过来的
  console.log(to, from)
  nprogress.start()
  const token = userStore.token
  // 获取用户信息
  const username = userStore.username
  if (token) {
    // 登录成功，访问login，不能访问，指向首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 其余的登录之后就正常跳转
      if (username) {
        next()
      } else {
        // 如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          // token过期：获取不到用户信息了
          // 用户手动清除本地存储的token
          // token过期，先执行退出登录操作
          userStore.userLogout()
          next({
            path: '/login',
            query: {
              redirect: to.path,
              ...to.query,
            },
          })
        }
      }
    }
  } else {
    // 如果未登录跳转登录页就直接放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果除登录页的其他页面就跳转到登录页
      next({ path: '/login' })
    }
  }
  next()
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 访问完路由之后的守卫
  nprogress.done()
})
