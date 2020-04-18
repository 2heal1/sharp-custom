import http from "./http";
/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-14 15:51:34
 * @Desc: 创建订单
 * @Params: userId 用户id
 * @Params: product 产品
 * @Params: prePrice 预定产品总价
 * @Params: nowPrice 现货产品总价
 * @Params: nowNum 现货产品数量
 * @Params: preNum 预定产品数量
 * @Params: remark 备注
 */
function createOrder(params) {
  return http.post("/api/orders/createOrder", params);
}

function getOrderInfoById(id) {
  return http.get("/api/orders/getOrderInfoById/" + id);
}

function getOrderList(params) {
  return http.get("/api/orders/getOrderList", { params: params });
}
export default {
  createOrder,
  getOrderInfoById,
  getOrderList,
};
