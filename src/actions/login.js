import http from "./http";
function login(params) {
  return http.post("api/users/login", params);
}
function registe(params) {
  return http.post("api/users/reg", params);
}
export default {
  // login(params) {
  //   return http.get("terminal/fetchTerminal", {
  //     params: params
  //   });
  // },
  login,
  registe
};
