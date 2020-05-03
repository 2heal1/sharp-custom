<template>
  <div class="newGoodsView">
    <div class="title">
      <div>{{ $t("sapc.home.newArrival") }}</div>
      <div
        span="8"
        class="viewMore"
        @click="jumpToViewMore"
      >
        {{ $t("sapc.common.viewMore") }}
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
    <div class="content">
      <div
        v-for="(item, index) in newGoodsDta"
        :key="index"
        class="child"
        @click="jumpToOthers(item)"
      >
        <div class="text">
          <div>{{ item.create_time }}</div>
          <div class="price">¥{{ (item.minPrice/1000 ).toFixed(2)}}</div>
        </div>
        <div>
          <img
            v-lazy="item.imgUrl"
            style="width:120px;height:90px;object-fit:cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productHttp from '@/actions/product'
import moment from 'moment'
export default {
  name: "NewGoods",
  data () {
    return {
      newGoodsDta: []
    };
  },
  methods: {
    getNewArrivalList () {
      productHttp.getNewArrivalList().then(res => {
        this.newGoodsDta = res.data.response.map(item => {
          item.create_time = moment(item.create_time).format('MM/DD')
          return item
        })
      })
    },
    jumpToOthers (item) {
      this.$router.push({ path: '/productDetail/' + item._id, query: { type: item.productType } })
    },
    jumpToViewMore () {
      this.$router.push({ path: '/productList/' + 6, query: { detailType: '' } })
    }
  },
  mounted () {
    this.getNewArrivalList()
  }
};
</script>

<style lang="less" scoped>
.newGoodsView {
  padding: 0 10px;
  .title {
    font-size: 32px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.88);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    .viewMore {
      font-size: 24px;
      font-weight: normal;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      i {
        font-size: 24px;
      }
    }
  }
  .content {
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    flex-direction: row;
    .child {
      display: flex;
      width: 50%;
      flex-direction: row;
      flex-shrink: 0;
      height: 180px;
      background: rgba(241, 241, 241, 0.5);
      margin-right: 20px;
      justify-content: space-between;
      .text {
        display: flex;
        flex-direction: column;
        font-size: 18px;
        font-weight: 500;
        color: #585858;
        padding: 6px 16px;
        justify-content: space-between;
        .price {
          color: #737373;
          padding: 0 0 16px 6px;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
