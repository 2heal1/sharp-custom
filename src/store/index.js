import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    keepAlivePage: ["home"],
    token: "",
    userInfo: "",
    productInfo: {}
  },
  mutations: {
    /**
     * javascript comment
     * @Author: zhanghang
     * @Date: 2020-03-26 16:16:17
     * @Desc: 保存token
     */
    saveToken(state, token) {
      state.token = token;
    },
    saveUserInfo(state, data) {
      state.userInfo = data;
    },
    saveProductInfo(state, data) {
      state.productInfo = data;
    },
    // 保存缓存页面
    savePage(state, pageName) {
      if (state.keepAlivePage.indexOf(pageName) === -1) {
        state.keepAlivePage.push(pageName);
      }
    },
    // 去除缓存页面
    removePage(state, pageName) {
      let index = state.keepAlivePage.indexOf(pageName);
      if (index !== -1) {
        state.keepAlivePage.splice(index, 1);
      }
    }
  }
});
