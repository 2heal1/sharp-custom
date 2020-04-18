<template>
  <div class="orderListComView">
    <div
      v-if="!!!this.orderList.length"
      class="emptyData"
    >
      <i class="iconfont icon-empty"></i>
      暂无数据
    </div>
    <div v-else>
      <div
        class="product"
        v-for="(item,index) in orderList"
        :key="index"
      >
        <div class="picInfo">
          <img :src="item.product[0].imgUrl">
          <div>{{item.product[0].title}}</div>
        </div>
        <div class="params">
          <div class="colorType">
            <div class="color">{{$t("sapc.common.colorType")}}</div>
            <div>
              <span
                style="margin-right:6px"
                v-for="title in item.product"
                :key="title.productId"
              >{{title.content}}</span>
            </div>
          </div>
          <div v-if="isNow">
            <div class="numType">
              <div class="num">
                <div class="color">总价</div>
                <div>{{'¥ '+item.totalPrice}}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="numType">
              <div class="num">
                <div class="color">{{$t("sapc.common.orderPrice")}}</div>
                <div>{{'¥ '+item.totalPrice}}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OrderListCom',
  props: ['status', 'orderList'],
  data () {
    return {

    }
  },
  computed: {
    isNow () {
      //判断是预定还是现货 
      // type=1 现货 
      // type=0 预定 
      return this.orderList.length && !!this.orderList[0].nowNum
    },
  },
  methods: {

  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.orderListComView {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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
  .product {
    background: white;
    display: flex;
    padding: 20px;
    flex-direction: column;
    margin-bottom: 20px;
    .picInfo {
      display: flex;
      flex-direction: row;
      margin-bottom: 30px;
      img {
        width: 100px;
        height: 100px;
      }
      div {
        font-size: 26px;
        margin-left: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(0, 0, 0, 0.7);
      }
    }
    .params {
      display: flex;
      flex-direction: column;
      font-size: 26px;
      color: rgba(0, 0, 0, 0.7);
      .colorType {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        .color {
          color: gray;
          margin-right: 10px;
        }
      }
      .numType {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .num {
          display: flex;
          flex-direction: row;
          .color {
            color: gray;
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>