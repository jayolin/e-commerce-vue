import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import filters from "./filters/";

Vue.use(filters);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
