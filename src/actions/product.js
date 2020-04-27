import http from "./http";
/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-10 10:53:04
 * @Desc: 获取产品评论信息
 */
function getProductCommentById(id) {
  return http.get("/api/goods/getProductCommentById/" + id);
}
/**
 * @Author: zhanghang
 * @Date: 2020-04-10 11:01:40
 * @Desc: 增加至购物车
 * @params type 商品类别
 * @params productId 商品id
 * @params id 用户id
 * @params num 商品数量
 * @params colorType 商品颜色类别
 */
function addToShopCar(params) {
  return http.post("/api/users/addToShopCar", params);
}
/**
 * @Author: zhanghang
 * @Date: 2020-04-10 11:01:40
 * @Desc: 增加至购物车
 * @params type 商品类别
 * @params productId 商品id
 * @params id 用户id
 * @params preNum 预定商品数量
 * @params colorType 商品颜色类别
 */
function addPreToShopCar(params) {
  return http.post("/api/users/addPreToShopCar", params);
}

/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-13 18:02:23
 * @Desc: 获取购物车
 */
function getShopCar(params) {
  return http.get("/api/goods/getShopCar", { params: params });
}

/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-18 20:03:16
 * @Desc:  获取制定类型购物车
 */
function getShopCarByType(params) {
  return http.get("/api/goods/getShopCarByType", { params: params });
}

function editShopCar(params) {
  return http.post("/api/users/editShopCar", params);
}

function deleteShopCar(params) {
  return http.post("/api/users/deleteShopCar", params);
}

function getSortTable() {
  return http.get("/api/goods/getSortTable");
}

function getProductList(params) {
  return http.get("/api/goods/getProductList", { params: params });
}

function getProductInfo(params) {
  return http.get("/api/goods/getProductInfo", { params: params });
}

function getNewArrivalList() {
  return http.get("/api/goods/getNewArrivalList");
}

export default {
  getProductCommentById,
  addToShopCar,
  addPreToShopCar,
  getShopCar,
  getShopCarByType,
  editShopCar,
  deleteShopCar,
  getSortTable,
  getProductList,
  getProductInfo,
  getNewArrivalList,
};
