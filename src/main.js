// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import "./assets/styles/css/reset.css"
import "./assets/styles/css/border.css"
import "./assets/styles/fonts/iconfont.css"
import "./assets/styles/css/base.css"
import Packages from "./pages/common/index.js"; //导入组件库
import store from "./store"; //导入公共库

Vue.use(Packages);
Vue.config.productionTip = false
fastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
