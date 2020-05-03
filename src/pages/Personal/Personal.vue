<template>
  <div class="personalView">
    <div class="personalImg">
      <!-- 头像姓名 -->
      <div class="avatarLayout">
        <img :src="data.avatar">
        <div>{{data.username}}</div>
      </div>
      <!-- 订单状态 -->
      <div class="orderStatus">
        <div
          class="detail"
          @click="jumpToOtherPages({path:'/order/orderList',query:{status:2}})"
        >
          <i class="iconfont icon-goods-send"></i>
          <div dot>{{$t("sapc.common.toBeDelivered")}}</div>
        </div>
        <div
          class="detail"
          @click="jumpToOtherPages({path:'/order/orderList',query:{status:4}})"
        >
          <i class="iconfont icon-goods-received"></i>
          <div>{{$t("sapc.common.toBeRecvied")}}</div>
        </div>
        <div
          class="detail"
          @click="jumpToOtherPages({path:'/order/orderList',query:{status:7}})"
        >
          <i class="iconfont icon-order-fill"></i>
          <div>{{$t("sapc.common.complete")}}</div>
        </div>
        <div
          class="detail"
          @click="jumpToOtherPages({path:'/order/orderList',query:{status:0}})"
        >
          <i class="iconfont icon-all-fill"></i>
          <div>{{$t("sapc.common.allOrders")}}</div>
        </div>
      </div>
    </div>
    <div class="list">
      <div
        class="listDetail"
        @click="jumpToOtherPages('/personal/managerAddress')"
      >
        <div class="title">
          <i class="iconfont icon-map"></i>
          <div>{{$t("sapc.common.addressManage")}}</div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
      <div
        class="listDetail"
        @click="jumpToOtherPages('/personal/infoList')"
      >
        <div class="title">
          <i class="iconfont icon-infomation"></i>
          <div>{{$t("sapc.common.messageManage")}}</div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
      <div class="listDetail">
        <div class="title">
          <i class="iconfont icon-phone"></i>
          <div>
            <a
              style=" color: rgba(0, 0, 0, 0.8);"
              href='tel:18266915978'
            >{{$t("sapc.common.contactBussiness")}}</a></div>
        </div>
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
import userHttp from '@/actions/user'
import { mapState } from 'vuex'

export default {
  name: 'Personal',
  data () {
    return {
      data: {}
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    getUserInfo () {
      userHttp.getUserInfo(this.userInfo.id).then(res => {
        if (res.data.success) {
          this.data = res.data.response
        }
      })
    },
    jumpToOtherPages (pages) {
      this.$router.push(pages)
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang="less" scoped>
.personalView {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rgba(187, 187, 187, 0.12);
  .personalImg {
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    background-color: #ff611c;
    position: relative;
    height: 160px;
    .avatarLayout {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 38px;
      font-weight: 500;
      color: white;
      img {
        margin-right: 20px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid rgba(241, 241, 241, 0.1);
      }
    }
    .orderStatus {
      display: flex;
      flex-direction: row;
      background-color: white;
      position: absolute;
      width: 90%;
      padding: 10px;
      top: 220px;
      height: 120px;
      border-radius: 16px;
      left: 50%;
      transform: translate(-50%, -50%);
      justify-content: space-between;
      .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        .iconfont {
          font-size: 54px;
          color: #ff611c;
          margin-bottom: 8px;
        }
      }
    }
  }
  .list {
    margin-top: 80px;
    margin: 80px 10px 0;
    padding: 10px;
    display: flex;
    border-radius: 16px;
    flex-direction: column;
    background-color: white;
    .listDetail {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      font-size: 26px;
      height: 80px;
      color: rgba(0, 0, 0, 0.8);
      .title {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .iconfont {
        font-size: 40px;
        margin-right: 12px;
        color: rgba(0, 0, 0, 0.8);
      }
      a:link {
        color: rgba(0, 0, 0, 0.8);
      }
      a:visited {
        color: rgba(0, 0, 0, 0.8);
      }
      a:hover {
        color: rgba(0, 0, 0, 0.8);
      }
      a:active {
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>