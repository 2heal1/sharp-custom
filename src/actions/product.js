import http from "./http";

function getProductCommentById(id) {
  return http.get("/api/goods/getProductCommentById/" + id);
}

export default {
  getProductCommentById,
};
