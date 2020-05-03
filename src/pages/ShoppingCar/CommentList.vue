<template>
  <div class="commentListComView">
    <div
      v-if="!!!Object.keys(comment).length"
      class="emptyData"
    >
      <i class="iconfont icon-empty"></i>
      {{$t("sapc.common.noData")}}
    </div>
    <!-- 商品评价 -->
    <div
      class="comment"
      v-else
    >
      <!-- 评价标题 -->
      <div class="commentTitle">
        <div class="textSize">{{$t("sapc.product.productComment")}}{{'（'+comment.num+'）'}}</div>
      </div>
      <!-- 评价标签 -->
      <div class="commentTag">
        <van-tag
          round
          size="medium"
          :type="tag.type"
          v-for="(tag, tagIndex) in comment.tag"
          :key="tagIndex"
          class="tagDetail"
        >{{ tag.title }}</van-tag>
      </div>
      <!-- 评论内容 -->
      <div
        v-for="(item,index) in comment.data"
        :key="index"
        class="commentContent"
      >
        <!-- 用户信息 -->
        <div class="commentUser">
          <img :src="item.avatar">
          <div>{{item.nickName}}</div>
        </div>
        <!-- 内容 -->
        <div class="commentMain">
          {{item.content}}
        </div>
        <!-- 商品类别 -->
        <div class="commentColorType">
          {{$t("sapc.product.colorType", [item.colorType])}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productHttp from "@/actions/product";
export default {
  name: 'OrderListCom',
  data () {
    return {
      comment: {}
    }
  },
  methods: {
    /** 
 * @Author: zhanghang 
 * @Date: 2020-04-10 11:01:34 
 * @Desc: 获取商品评论信息 
 */
    getProductCommentById () {
      productHttp
        .getProductCommentById(this.$route.params.id)
        .then(res => {
          if (res.status === 200) {
            this.comment = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted () {
    this.getProductCommentById()
  }
}
</script>
<style lang="less" scoped>
.commentListComView {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .emptyData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
    padding: 20px;
    font-size: 36px;
    .iconfont {
      font-size: 120px;
      margin-bottom: 20px;
    }
  }
  .comment {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    margin-bottom: 20px;
    font-size: 20px;
    flex-shrink: 0;
    .commentTitle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .textSize {
        font-size: 30px;
        color: #1f1f1f;
      }
      .commentViewMore {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #f7257b;
        font-size: 24px;
        .iconfont {
          font-size: 40px;
          margin-left: 10px;
        }
      }
    }
    .commentTag {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex-shrink: 0;
      .tagDetail {
        margin: 10px 10px 0 0;
      }
    }
    .commentContent {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      color: rgba(0, 0, 0, 0.85);
      width: 100%;
      .commentUser {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16px;
        width: 100%;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid rgba(189, 189, 189, 0.29);
          margin-right: 10px;
        }
        div {
          color: rgba(128, 128, 128, 0.71);
          font-weight: 500;
        }
      }
      .commentColorType {
        margin-top: 10px;
        color: rgba(128, 128, 128, 0.71);
      }
      .commentMain {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        word-break: break-all;
      }
    }
  }
}
</style>