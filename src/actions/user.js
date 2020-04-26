import http from "./http";
/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-15 18:17:20
 * @Desc: 增加地址
 * @Desc: 增加地址
 * @Params: userId 用户id
 * @Params: name 姓名
 * @Params: tel 电话
 * @Params: country 国家 一般为空 默认中国
 * @Params: province 省份 浙江省
 * @Params: city 城市 杭州市
 * @Params: county 区县 西湖区
 * @Params: provinceCode 省份编码 浙江省
 * @Params: cityCode 市区编码  杭州市
 * @Params: areaCode 地区编码 西湖区
 * @Params: postalCode 邮政编码
 * @Params: addressDetail 详细地址
 * @Params: isDefault 是否为默认地址
 */
function addAddress(params) {
  return http.post("/api/users/addAddress", params);
}
/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-15 18:17:57
 * @Desc: 修改地址
 * @Params: id 地址
 * @Params: userId 用户id
 * @Params: name 姓名
 * @Params: tel 电话
 * @Params: country 国家 一般为空 默认中国
 * @Params: province 省份 浙江省
 * @Params: city 城市 杭州市
 * @Params: county 区县 西湖区
 * @Params: provinceCode 省份编码 浙江省
 * @Params: cityCode 市区编码  杭州市
 * @Params: areaCode 地区编码 西湖区
 * @Params: postalCode 邮政编码
 * @Params: addressDetail 详细地址
 * @Params: isDefault 是否为默认地址
 */
function editAddress(params) {
  return http.post("/api/users/editAddress", params);
}
/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-15 18:39:41
 * @Desc: 获取地址列表
 */
function getAddressList(id) {
  return http.get("/api/users/getAddressList/" + id);
}
/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-15 18:39:48
 * @Desc: 获取地址信息
 */
function getAddressInfo(id) {
  return http.get("/api/users/getAddressInfo/" + id);
}

/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-15 18:39:48
 * @Desc: 获取当前默认地址
 */
function getDefaultAddress(id) {
  return http.get("/api/users/getDefaultAddress/" + id);
}

/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-18 13:04:04
 * @Desc: 获取用户信息
 */
function getUserInfo(id) {
  return http.get("/api/users/getUserInfo/" + id);
}

/**
 * javascript comment
 * @Author: zhanghang
 * @Date: 2020-04-26 13:35:14
 * @Desc: 收藏/取消收藏
 * @params: type  1收藏 0取消收藏
 * @params: id  用户id
 * @params: productId  产品id
 */
function collectProduct(params) {
  return http.post("/api/users/collectProduct", params);
}

export default {
  addAddress,
  editAddress,
  getAddressList,
  getAddressInfo,
  getDefaultAddress,
  getUserInfo,
  collectProduct,
};
