<template>
  <div class="classProductListView">
    <div style="position:relative">
      <van-tabbar
        v-model="active"
        :fixed="false"
        @change="changeSort"
      >
        <van-tabbar-item>{{$t("sapc.common.sub")}}</van-tabbar-item>
        <van-tabbar-item>{{$t("sapc.common.sume")}}</van-tabbar-item>
        <van-tabbar-item>{{$t("sapc.common.news")}}</van-tabbar-item>
        <van-tabbar-item @click="changePrice()">{{$t("sapc.common.price")}}<i
            :class="{ 'icon-arrow-down': isDown, 'icon-arrow-up': !isDown }"
            class="iconfont"
          /></van-tabbar-item>
      </van-tabbar>
    </div>
    <van-search
      v-model="searchName"
      background="rgba(187, 187, 187, 0.12)"
      :placeholder="$t('sapc.common.pleaseInputKeyWord')"
      @search="onSearch"
    />
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
      searchName: '',
    };
  },
  methods: {
    onSearch () {
      this.searchProduct()
    },
    searchProduct () {
      productHttp
        .searchProduct({
          productType: this.$route.params.type,
          detailType: this.$route.query.detailType,
          name: this.searchName,
        })
        .then((res) => {
          if (res.status === 200) {
            this.data = res.data.response;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProductList () {
      productHttp
        .getProductList({
          productType: this.$route.params.type,
          detailType: this.$route.query.detailType,
        })
        .then((res) => {
          if (res.status === 200) {
            this.originData = JSON.parse(JSON.stringify(res.data.response)).filter(item => !!item.left);
            this.data = res.data.response.filter(item => !!item.left);
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
        if (this.isDown) {
          this.data = this.originData
            .slice(0)
            .sort((a, b) => b.minPrice - a.minPrice);
        } else {
          this.data = this.originData
            .slice(0)
            .sort((a, b) => a.minPrice - b.minPrice);
        }
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
  /deep/.van-tabbar-item {
    height: 100%;
  }
  /deep/.van-tabbar-item--active {
    color: #fd0956;
  }
  /deep/.van-search__content {
    background: rgba(187, 187, 187, 0.12);
  }
  /deep/.van-tabbar-item__text {
    font-size: 14px;
  }
}
</style>
