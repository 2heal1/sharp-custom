import Vue from "vue";
import App from "./App.vue";
//用于适配rem
import "lib-flexible/flexible";
import { NumberKeyboard, Button, Field } from "vant";
import router from './router'

Vue.use(NumberKeyboard);
Vue.use(Button);
Vue.use(Field);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
