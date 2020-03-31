<template>
  <div class="homeView">
    <new-goods />
    <div class="indexTitle">
      <div>{{ $t("sapc.home.preferredProducts") }}</div>
    </div>
    <van-swipe :autoplay="3000" class="swipe">
      <van-swipe-item v-for="(image, index) in preferredProducts" :key="index">
        <img v-lazy="image.imgUrl" />
      </van-swipe-item>
    </van-swipe>
    <DiscountProducts class="discountProducts" />
  </div>
</template>

<script>
import NewGoods from "./NewGoods";
import DiscountProducts from "./DiscountProducts";
import homeHttp from "@/actions/home";

export default {
  name: "Home",
  components: { NewGoods, DiscountProducts },
  data() {
    return {
      preferredProducts: []
    };
  },
  methods: {
    getPreferredProductList() {
      homeHttp
        .getPreferredProductList()
        .then(res => {
          if (res.status === 200) {
            this.preferredProducts = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getPreferredProductList();
  }
};
</script>
<style lang="less">
.homeView {
  width: 100%;
  .indexTitle {
    padding: 0 10px;
    margin-top: 20px;
    font-size: 32px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.88);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .swipe {
    width: 100%;
    height: 450px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .discountProducts {
    margin-top: 20px;
  }
}
</style>
