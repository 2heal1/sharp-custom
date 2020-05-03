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
  ActionSheet,
  Row,
  Tab,
  Sidebar,
  SidebarItem,
  Tabs,
  Form,
  Loading,
  Toast,
  Swipe,
  SwipeItem,
  Tag,
  Switch,
  RadioGroup,
  Radio,
  Lazyload,
  Popup,
  Dialog,
  Area,
  Checkbox,
  SwipeCell,
  CheckboxGroup,
  AddressList,
  AddressEdit,
  Stepper,
  TreeSelect,
  Search,
  Tabbar,
  TabbarItem,
} from "vant";

Vue.use(VueI18n);
Vue.use(NumberKeyboard);
Vue.use(ActionSheet);
Vue.use(Button);
Vue.use(Field);
Vue.use(Tabbar);
Vue.use(Search);
Vue.use(TabbarItem);
Vue.use(Col);
Vue.use(SidebarItem);
Vue.use(Sidebar);
Vue.use(TreeSelect);
Vue.use(Checkbox);
Vue.use(SwipeCell);
Vue.use(CheckboxGroup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Loading);
Vue.use(Row);
Vue.use(Tab);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(Area);
Vue.use(AddressList);
Vue.use(AddressEdit);
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
  locale: store.state.language, // 语言标识
  messages: {
    zh_CN: require("./locales/zh_CN/index"), // 中文语言包
    en_US: require("./locales/en_US/index"), // 英文语言包
    en_ES: require("./locales/en_ES/index"), // 西班牙语言包
  },
});
router.beforeEach((to, from, next) => {
  if (!Object.keys(store.state.userInfo).length) {
    sessionStorage.getItem("token") &&
      store.commit("saveToken", sessionStorage.getItem("token"));
    sessionStorage.getItem("userInfo") &&
      store.commit(
        "saveUserInfo",
        JSON.parse(sessionStorage.getItem("userInfo"))
      );
    sessionStorage.getItem("productInfo") &&
      store.commit(
        "saveProductInfo",
        JSON.parse(sessionStorage.getItem("productInfo"))
      );
    if (sessionStorage.getItem("language")) {
      store.commit("saveLanguage", sessionStorage.getItem("language"));
      i18n.locale = sessionStorage.getItem("language");
    }
  }
  next();
});
new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
