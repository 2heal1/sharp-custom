import Vue from "vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import "@/assets/icon/iconfont.css";

//用于适配rem
import "lib-flexible/flexible";
import { NumberKeyboard, Button, Field } from "vant";
import router from "./router";

Vue.use(VueI18n);
Vue.use(NumberKeyboard);
Vue.use(Button);
Vue.use(Field);
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "zh_CN", // 语言标识
  messages: {
    zh_CN: require("./locales/zh_CN/index"), // 中文语言包
    en_US: require("./locales/en_US/index") // 英文语言包
  }
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
