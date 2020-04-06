<template>
  <div class="productDetail">
    <!-- 轮播 -->
    <van-swipe
      :autoplay="3000"
      class="swipe"
    >
      <van-swipe-item
        v-for="(image, index) in data.imgUrlArr"
        :key="index"
      >
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- 折扣价 -->
    <div>
      {{'¥ '+(data.discount*data.price/1000).toFixed(2)}}
    </div>
    <!-- 原价 -->
    <div>
      {{data.price}}
    </div>
    <!-- 标题+参数按钮+分享按钮 -->
    <div class="title">
      <!-- 标题 -->
      <div> {{data.title}}</div>
      <!-- 参数 -->
      <div class="child">
        <div class="params">
          <i class="iconfont icon-conditions"></i>
          <div class="text">参数</div>
        </div>
        <!-- 分享 -->
        <div class="params">
          <i class="iconfont icon-share"></i>
          <div class="text">分享</div>
        </div>
      </div>
    </div>
    <!-- 描述+销量 -->
    <div class="dec">
      <div>{{data.dec}}</div>
      <div>{{ $t("sapc.common.saleVolume", [data.saleVolume]) }}</div>
    </div>
    <!-- 选择颜色分类 -->
    <div class="selectSort">
      <i class="iconfont icon-select-sort"></i>
      <div class="typeChild">
        <div class="text">{{ $t("sapc.product.pleaseChooseColorType") }}</div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
    <!-- 商品评价 -->
    <div class="comment">
      <!-- 评价标题 -->
      <div class="commentTitle">
        <div class="textSize">{{$t("sapc.product.productComment")}}{{'（'+comment.num+'）'}}</div>
        <div class="commentViewMore">
          <div>{{$t('sapc.common.viewMore')}}</div>
          <i class="iconfont icon-arrow-right"></i>
        </div>
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
      >
        <!-- 用户信息 -->
        <div>
          <img :src="item.avatar">
          <div>{{item.nickName}}</div>
        </div>
        <!-- 内容 -->
        <div>
          {{item.content}}
        </div>
        <!-- 商品类别 -->
        <div>
          {{$t("sapc.product.colorType", [item.content])}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import homeHttp from "@/actions/home";
import productHttp from "@/actions/product";
export default {
  name: "ProductDetail",
  data () {
    return {
      data: {},
      comment: {}
    }
  },
  methods: {
    getDiscountProductInfoById () {
      homeHttp
        .getDiscountProductInfoById(this.$route.params.id)
        .then(res => {
          if (res.status === 200) {
            this.data = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    this.getDiscountProductInfoById()
    this.getProductCommentById()
  }
};
</script>

<style lang="less" scoped>
.productDetail {
  display: flex;
  flex-direction: column;
  width: 100%;
  .swipe {
    width: 100%;
    height: 450px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 20px;
    .child {
      display: flex;
      flex-direction: row;
      .params {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 20px;
        .iconfont {
          font-size: 40px;
          color: gray;
        }
        .text {
          font-size: 8px;
          color: gray;
        }
      }
    }
  }
  .dec {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 20px;
  }
  .selectSort {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    margin-bottom: 20px;
    .iconfont {
      font-size: 40px;
      color: gray;
      flex-shrink: 0;
    }
    .typeChild {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      align-items: center;
      justify-content: space-between;
      padding-left: 20px;
      .iconfont {
        font-size: 40px;
        color: gray;
      }
      .text {
        font-size: 8px;
        color: gray;
      }
    }
  }
  .comment {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    margin-bottom: 20px;
    .commentTitle {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
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
      .tagDetail {
        margin: 10px 10px 0 0;
      }
    }
  }
}
</style>
