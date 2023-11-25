// 路由鉴权
import router from '@/router'
// npm i --save-dev @types/nprogress 解决nprogress的ts问题
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局守卫：项目当中任意路由切换都会触发钩子
// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // 访问某一个路由之前的守卫
  // to: 将要访问到路由  from: 从哪个路由跳转过来的
  console.log(to, from)
  nprogress.start()
  next()
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 访问完路由之后的守卫
  nprogress.done()
})
