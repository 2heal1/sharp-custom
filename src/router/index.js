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
    path: "/productDetail/:id",
    name: "ProductDetail",
    component: () =>
      import(/* webpackChunkName: "index" */ "@/components/ProductDetail"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
