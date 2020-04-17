import Vue from "vue";
import VueRouter from "vue-router";

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
        /* webpackChunkName: "index" */ "@/pages/Classification/Classification"
      ),
  },
  {
    path: "/shoppingCar",
    name: "ShoppingCar",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/ShoppingCar/ShoppingCar"),
  },
  {
    path: "/personal",
    name: "Personal",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/Personal/Personal"),
  },
  {
    path: "/personal/managerAddress",
    name: "ManagerAddress",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/Personal/ManagerAddress"),
  },
  {
    path: "/personal/editAddress/:id",
    name: "EditAddress",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/Personal/EditAddress"),
  },
  {
    path: "/personal/addAddress",
    name: "AddAddress",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/Personal/EditAddress"),
  },
  {
    path: "/productDetail/:id",
    name: "ProductDetail",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/components/ProductDetail"),
  },
  {
    path: "/order/confirmOrder",
    name: "ConfirmOrder",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/Order/ConfirmOrder"),
  },
  {
    path: "/order/orderDetail/:id",
    name: "OrderDetail",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/pages/Order/OrderDetail"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
