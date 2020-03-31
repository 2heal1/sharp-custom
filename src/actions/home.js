import http from "./http";
function getPreferredProductList(params) {
  return http.get("api/goods/getPreferredProductList", params);
}

export default {
  getPreferredProductList
};
