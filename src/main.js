import Vue from "vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";
import store from "./store/index";
import router from "./router";
import loadingImg from "@/assets/loading.jpeg";

import "@/assets/icon/iconfont.css";

//用于适配rem
import "lib-flexible/flexible";
import {
  NumberKeyboard,
  Button,
  Field,
  Col,
  Row,
  Tab,
  Tabs,
  Form,
  Toast,
  Swipe,
  SwipeItem,
  Tag,
  Lazyload,
  Popup,
  Stepper,
} from "vant";

Vue.use(VueI18n);
Vue.use(NumberKeyboard);
Vue.use(Button);
Vue.use(Field);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(Form);
Vue.use(Swipe);
Vue.use(Tag);
Vue.use(SwipeItem);
Vue.use(Popup);
Vue.use(Stepper);
Vue.use(Lazyload, {
  loading: loadingImg,
});
Vue.config.productionTip = false;

const i18n = new VueI18n({
  locale: "zh_CN", // 语言标识
  messages: {
    zh_CN: require("./locales/zh_CN/index"), // 中文语言包
    en_US: require("./locales/en_US/index"), // 英文语言包
  },
});

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
