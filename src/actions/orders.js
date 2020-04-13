import http from "./http";
function createOrder(params) {
  return http.post("/api/orders/createOrder", params);
}

export default {
  createOrder
};
