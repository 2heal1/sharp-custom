import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    keepAlivePage: ["home"],
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTgyNjY5MTU5NzgiLCJpYXQiOjE1ODY5NDYxNTIsImV4cCI6MTU4Njk1MjE1Mn0.C28alvWNkJnk_bjfftTWoY-3hdttldp0EDKsDoryRYc",
    userInfo: {
      message: "登录成功",
      success: true,
      username: "heal",
      id: "5e8fea35d15572df7801fc45",
      address: [],
      phone: "18266915978",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTgyNjY5MTU5NzgiLCJpYXQiOjE1ODY5NDYxNTIsImV4cCI6MTU4Njk1MjE1Mn0.C28alvWNkJnk_bjfftTWoY-3hdttldp0EDKsDoryRYc",
      create_time: "2020-04-14 16:13:18",
    },
    productInfo: {},
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
    },
  },
});
