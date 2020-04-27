import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/loginRegist",
    name: "LoginRegist",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/LoginRegist/index"),
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/Index/Index"),
  },
  {
    path: "/classification",
    name: "Classification",
    component: () =>
      import(
        /* webpackChunkName: "classification" */ "@/pages/Classification/Classification"
      ),
  },
  {
    path: "/shoppingCar",
    name: "ShoppingCar",
    component: () =>
      import(
        /* webpackChunkName: "shoppingCar" */ "@/pages/ShoppingCar/ShoppingCar"
      ),
  },
  {
    path: "/personal",
    name: "Personal",
    component: () =>
      import(/* webpackChunkName: "personal" */ "@/pages/Personal/Personal"),
  },
  {
    path: "/personal/managerAddress",
    name: "ManagerAddress",
    component: () =>
      import(
        /* webpackChunkName: "personal" */ "@/pages/Personal/ManagerAddress"
      ),
  },
  {
    path: "/personal/infoList",
    name: "InfoList",
    component: () =>
      import(/* webpackChunkName: "personal" */ "@/pages/Personal/InfoList"),
  },
  {
    path: "/personal/editAddress/:id",
    name: "EditAddress",
    component: () =>
      import(/* webpackChunkName: "personal" */ "@/pages/Personal/EditAddress"),
  },
  {
    path: "/personal/addAddress",
    name: "AddAddress",
    component: () =>
      import(/* webpackChunkName: "personal" */ "@/pages/Personal/EditAddress"),
  },
  {
    path: "/productDetail/:id",
    name: "ProductDetail",
    component: () =>
      import(
        /* webpackChunkName: "productDetail" */ "@/components/ProductDetail"
      ),
  },
  {
    path: "/commentList/:id",
    name: "CommentList",
    component: () =>
      import(
        /* webpackChunkName: "productDetail" */ "@/pages/ShoppingCar/CommentList"
      ),
  },
  {
    path: "/order/confirmOrder",
    name: "ConfirmOrder",
    component: () =>
      import(/* webpackChunkName: "order" */ "@/pages/Order/ConfirmOrder"),
  },
  {
    path: "/order/orderList",
    name: "OrderList",
    component: () =>
      import(/* webpackChunkName: "order" */ "@/pages/Order/OrderList"),
  },
  {
    path: "/order/orderDetail/:id",
    name: "OrderDetail",
    component: () =>
      import(/* webpackChunkName: "order" */ "@/pages/Order/OrderDetail"),
  },
  {
    path: "/productList/:type",
    name: "ClassProductList",
    component: () =>
      import(
        /* webpackChunkName: "personal" */ "@/pages/Classification/ClassProductList"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
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
  }
  next();
});

export default router;
