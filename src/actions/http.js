import qs from "qs";
// import Vue from 'vue'
import axios from "axios";
import i18n from "@/i18n";
import store from "@/store/index";
import router from "@/router/index";
const http = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    post: {
      "Content-Type": "application/x-www-form-urlencode;charset=UTF-8"
    },
    "X-Requested-with": XMLHttpRequest
  },
  timeout: 30000,
  paramsSerializer(params) {
    params.time = Date.now();
    return qs.stringify(params, { arrayFormat: "brackets" });
  }
});
export const getMsg = (msg, data) => {
  if (/^duoyuyan\.*/.test(msg)) {
    const value = i18n.t(msg);
    return value && value.match(/\{.*\}/g)
      ? i18n.t(
          msg,
          data.map(item => i18n.t(item))
        )
      : value;
  } else {
    return msg;
  }
};

// POST传参序列化（添加请求拦截器）
http.interceptors.request.use(
  config => {
    //判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 对请求响应进行拦截并添加错误处理
http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 请求超时的处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace({
            //跳转到登录页面
            path: "loginRegist",
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
    }
    return Promise.reject(error.response);
  }
);
export default http;
