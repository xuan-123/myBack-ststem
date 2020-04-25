import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
//引入全局配置文件
import $conf from './common/config/config'
Vue.prototype.$conf = $conf

Vue.use(ElementUI);
new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')
