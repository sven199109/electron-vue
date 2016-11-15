import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from 'config/routes'
import store from 'store'
import common from 'components'

import 'assets/styles'

Object.keys(common).forEach(key => {
  let name = key.replace(/(\w)/, v => v.toUpperCase()).toLowerCase()
  Vue.component(`common-${name}`, common[key])
})

Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

router.beforeEach(({meta, path}, from, next) => {
  var { auth = true } = meta
  var isLogin = Boolean(store.state.user.id)
  // var isLogin = Boolean(store.state.user)
  if(auth && !isLogin && path !== '/login') {
    return next({ path: '/login' })
  }
  next()
})

new Vue({ store, router }).$mount('#app')
