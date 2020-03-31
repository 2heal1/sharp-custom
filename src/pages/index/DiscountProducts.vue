<template>
  <div class="discountView">
    <div class="title">
      <div>{{ $t("sapc.home.discountProducts") }}</div>
    </div>
    <ProductList :data="discountList" />
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import homeHttp from "@/actions/home";

export default {
  name: "DiscountProducts",
  components: { ProductList },
  data() {
    return {
      discountList: []
    };
  },
  methods: {
    getDiscountList() {
      homeHttp
        .getDiscountProducts()
        .then(res => {
          if (res.status === 200) {
            this.discountList = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDiscounInfo() {
      homeHttp
        .getDiscountProductInfoById("5e83204919eb50093105f9c7")
        .then(res => {
          if (res.status === 200) {
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDiscountList();
    this.getDiscounInfo();
  }
};
</script>
<style lang="less">
.discountView {
  padding: 0 10px;
  .title {
    font-size: 32px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.88);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
