<template>
  <div class="confirmOrderView">
    <div class="layoutContent">
      <!-- 订单状态 -->
      <div class="orderStatus">
        <div class="status">
          <div>{{$t("sapc.order.orderStatus")}}</div>
          <div :style="{color:data.status==8||data.status==9 ? 'gray' : 'green'}"> {{orderStatus[data.status]}}</div>
        </div>
        <div class="statusTime">
          <div>{{$t("sapc.order.latestOrderTime")}}</div>
          <div> {{data.lastModifiedTime}}</div>
        </div>
      </div>
      <!-- 收件人信息 -->
      <div class="address">
        <div>
          <div class="firstLine">
            <div>
              <span>{{$t("sapc.common.receiver")+' : '}}</span>
              <span>{{userInfo.username}}</span>
            </div>
            <span class="phone">{{userInfo.phone}}</span>
          </div>
          <div class="secondLine">
            <div>{{data.address}}</div>
          </div>
        </div>
      </div>
      <!-- 商品信息 -->
      <div
        class="product"
        v-for="(item,index) in data.product"
        :key="index"
      >
        <div
          class="picInfo"
          @click="jumpToDetails(item,1)"
        >
          <img :src="item.imgUrl">
          <div>{{item.title}}</div>
        </div>
        <div
          class="params"
          @click="jumpToDetails(item,1)"
        >
          <div class="colorType">
            <div class="color">{{$t("sapc.common.colorType")}}</div>
            <div>{{item.content}}</div>
          </div>
          <div v-if="isNow">
            <div class="numType">
              <div class="num">
                <div class="color">{{$t("sapc.common.unitPrice")}}</div>
                <div>{{'¥ '+(item.discount*item.price/1000).toFixed(2)}}</div>
              </div>
              <div>
                <div class="num">
                  <div class="color">{{$t("sapc.common.shopNum")}}</div>
                  <div>{{item.num}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="numType">
              <div class="num">
                <div class="color">{{$t("sapc.common.orderPrice")}}</div>
                <div>{{'¥ '+(item.discount*item.price/1000).toFixed(2)}}</div>
              </div>
              <div class="num">
                <div class="color">{{$t("sapc.common.preNum")}}</div>
                <div>{{item.num}}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="commentBtn"
          v-if="data.status==7 && item.hasComment==false"
        >
          <van-tag
            color="#f2826a"
            plain
            @click="jumpToDetails(item,2)"
          > {{$t("sapc.order.comment2")}}</van-tag>
        </div>
      </div>
      <div class="remark">
        <div>{{$t('sapc.common.remark')}}</div>
        <div> {{data.remark}}</div>
      </div>
      <!-- 提交订单 -->
      <div class="totalBottom">

        <div class="status">
          <div>{{$t("sapc.order.totalPrice2")}}</div>
          <div> {{'¥ '+data.totalPrice}}</div>
        </div>
        <div class="statusTime">
          <div>{{$t("sapc.order.orderTime")}}</div>
          <div> {{data.create_time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import orderHttp from '@/actions/orders'
import { mapState, mapMutations } from 'vuex'
import orderStatus from '@/utils/orderStatus'

export default {
  name: 'OrderDetail',
  computed: {
    ...mapState(['userInfo']),
    isNow () {
      //判断是预定还是现货 
      return this.data.nowNum !== 0
    }
  },

  data () {
    return {
      orderStatus,
      value: 0,
      remark: '',
      data: [],
      address: '暂未填写地址'
    }
  },
  methods: {
    ...mapMutations(['saveSelectedAddress']),
    getOrderInfoById () {
      orderHttp.getOrderInfoById(this.$route.params.id).then(res => {
        if (res.status == 200) {
          this.data = res.data.response
        }
      })
    },
    jumpToDetails (item, type) {
      let id = item.productId.slice(0, -3)
      if (type == 1) {
        this.$router.push({ path: '/productDetail/' + id, query: { type: item.productType } })
      } else if (type == 2) {
        this.$router.push({
          path: '/order/commentProduct/' + id, query: {
            colorType: item.content, type: item.productType,
            completeId: item.productId,
            orderId: this.data._id
          }
        })
      }
    },
  },
  created () {
    this.getOrderInfoById()
  },
}
</script>
<style lang="less" scoped>
.confirmOrderView {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background: rgba(187, 187, 187, 0.12);
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .layoutContent {
    display: flex;
    overflow: scroll;
    flex-grow: 1;
    flex-direction: column;
    ::-webkit-scrollbar {
      width: 0 !important;
    }
    .orderStatus {
      display: flex;
      flex-direction: column;
      padding: 20px;
      border-bottom: 2px solid #ececec;
      .status {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 500;
        :nth-child(2) {
          color: green;
        }
      }
      .statusTime {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 12px;
      }
    }
    .address {
      padding: 20px;
      .firstLine {
        font-size: 26px;
        opacity: 80%;
        color: black;
        font-weight: 500;
        margin: 12px 0 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .phone {
          margin-left: 40px;
        }
      }
      .secondLine {
        font-size: 26px;
        opacity: 80%;
        color: rgba(0, 0, 0, 0.7);
        margin: 12px 0 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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
    .remark {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 12px;
      background-color: white;
      padding: 20px;
    }
    .totalBottom {
      display: flex;
      flex-direction: column;
      padding: 20px;
      border-bottom: 2px solid #ececec;
      background-color: white;
      .status {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 500;
        :nth-child(2) {
          color: red;
          font-size: 32px;
        }
      }
      .statusTime {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 12px;
      }
    }
  }
  .commentBtn {
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
    z-index: 999;
  }

  //保证ipx以上的底部导航安全距离
  @supports (bottom: env(safe-area-inset-bottom)) {
    .totalBottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
</style>