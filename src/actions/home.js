import http from "./http";

function getPreferredProductList() {
  return http.get("/api/goods/getPreferredProductList");
}

function getDiscountProducts() {
  return http.get("/api/goods/getDiscountProducts");
}

function getDiscountProductInfoById(id) {
  return http.get("/api/goods/getDiscountProductInfoById/" + id);
}
export default {
  getPreferredProductList,
  getDiscountProducts,
  getDiscountProductInfoById,
};
