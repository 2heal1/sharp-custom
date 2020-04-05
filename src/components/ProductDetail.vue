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
  </div>
</template>
<script>
import homeHttp from "@/actions/home";
export default {
  name: "ProductDetail",
  data () {
    return {
      data: {}
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
    }
  },
  mounted () {
    this.getDiscountProductInfoById()
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
  }
}
</style>
