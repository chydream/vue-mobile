import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "mobile" */'@/mobile/mvue/layout/Index'),
      redirect:'/index',
      children: [
        {
          path: 'index',
          name: 'HomeIndex',
          component: () => import(/* webpackChunkName: "mobile" */'@/mobile/mvue/views/clock/Clock'),
          meta:{
            title:'扫码签到'
          }
        },
        {
          path: 'sign-clock',
          name: 'Sign-Clock',
          component: () => import(/* webpackChunkName: "mobile" */'@/mobile/mvue/views/clock/SignClock'),
          meta:{
            title:'签到'
          }
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: () => import(/* webpackChunkName: "mobile" */'@/mobile/mvue/views/clock/Calendar'),
          meta:{
            title:'签到日历'
          }
        },
      ]
    },
  ]
})
export default router
// 路由生命周期
router.beforeEach((to, from, next) => {
  Vue.$vux.loading.show({
    text: '加载中'
  })
  next()
})
// 路由生命周期
router.afterEach((to, from) => {
  // console.log(to)
  window.document.title = to.meta.title
  setTimeout(() => {
    Vue.$vux.loading.hide()
  }, 200)
})