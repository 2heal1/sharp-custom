<template>
  <div class="classProductListView">
    <van-tabbar
      v-model="active"
      :fixed="false"
      @change="changeSort"
    >
      <van-tabbar-item>综合</van-tabbar-item>
      <van-tabbar-item>销量</van-tabbar-item>
      <van-tabbar-item>上新</van-tabbar-item>
      <van-tabbar-item @click="changePrice()">价格<i
          :class="{ 'icon-arrow-down': isDown, 'icon-arrow-up': !isDown }"
          class="iconfont"
        /></van-tabbar-item>
    </van-tabbar>
    <div class="childView">
      <ProductList :data="data" />
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList";
import productHttp from "@/actions/product";
import moment from "moment";

export default {
  name: "ClassProductList",
  components: { ProductList },
  data () {
    return {
      data: [],
      originData: [],
      active: 0,
      isactive: false,
      isDown: true,
    };
  },
  methods: {
    getProductList () {
      productHttp
        .getProductList({
          productType: this.$route.params.type,
          detailType: this.$route.query.detailType,
        })
        .then((res) => {
          if (res.status === 200) {
            this.originData = JSON.parse(JSON.stringify(res.data.response));
            this.data = res.data.response;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeSort (type) {
      type = Number(type);
      switch (type) {
        case 0:
          this.data = this.originData.slice(0);
          this.isactive = false;
          break;
        case 1:
          this.data = this.originData
            .slice(0)
            .sort((a, b) => b.saleVolume - a.saleVolume);
          this.isactive = false;
          break;
        case 2:
          this.data = this.originData.slice(0).sort(
            (a, b) =>
              moment(b.create_time, "YYYY-MM-DD HH:mm:ss")
                .toDate()
                .getTime() -
              moment(a.create_time, "YYYY-MM-DD HH:mm:ss")
                .toDate()
                .getTime()
          );
          this.isactive = false;
          break;
        default:
          break;
      }
    },
    changePrice () {
      if (this.isactive) {
        this.isDown = !this.isDown;
        this.data = this.originData
          .slice(0)
          .sort((a, b) => a.minPrice - b.minPrice);
      } else {
        this.isactive = true;
        this.data = this.originData
          .slice(0)
          .sort((a, b) => b.minPrice - a.minPrice);
      }
    },
  },
  mounted () {
    this.getProductList();
  },
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
