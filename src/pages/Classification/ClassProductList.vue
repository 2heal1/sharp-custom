<template>
  <div class="classProductListView">
    <van-tabbar
      v-model="active"
      :fixed="false"
    >
      <van-tabbar-item>综合</van-tabbar-item>
      <van-tabbar-item>销量</van-tabbar-item>
      <van-tabbar-item>上新</van-tabbar-item>
      <van-tabbar-item>价格<i class="iconfont icon-arrow-down" /></van-tabbar-item>
    </van-tabbar>
    <div class="childView">
      <ProductList :data="data" />
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import productHttp from "@/actions/product";

export default {
  name: "ClassProductList",
  components: { ProductList },
  data () {
    return {
      data: [],
      active: 0,
    };
  },
  methods: {
    getProductList () {
      productHttp
        .getProductList({ productType: this.$route.params.type })
        .then(res => {
          if (res.status === 200) {
            this.data = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

  },
  mounted () {
    this.getProductList();
  }
};
</script>
<style lang="less" scoped>
.classProductListView {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  background: rgba(187, 187, 187, 0.12);
  .childView {
    padding: 20px;
    background: rgba(187, 187, 187, 0.12);
  }
  /deep/.van-tabbar {
    background: rgba(187, 187, 187, 0.12);
    font-size: 28px;
  }
  /deep/.van-tabbar-item--active {
    color: #fd0956;
  }
}
</style>
