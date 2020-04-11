<template>
  <div class="confirmOrderView">
    <div class="layoutContent">
      <!-- 收件人信息 -->
      <div class="address">
        <div class="firstLine">
          <span>姓名</span>
          <span class="phone">联系方式</span>
        </div>
        <div class="secondLine">
          <div>地址地址地址地址地址地址地址地址地址
            地址地址地址地址地址地址地址
          </div>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <!-- 商品信息 -->
      <div class="product">
        <div class="picInfo">
          <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2055165149,2704025303&fm=26&gp=0.jpg">
          <div>title哈哈title哈哈title哈哈title哈哈title哈哈
            title哈哈title哈哈title哈哈
          </div>
        </div>
        <div class="params">
          <div class="colorType">
            <div class="color">颜色zhong类</div>
            <div>名字</div>
          </div>
          <div class="numType">
            <div class="num">
              <div class="color">购买单价</div>
              <div>111</div>
            </div>
            <div>
              <van-stepper v-model="value" />
            </div>
          </div>
          <div class="numType">
            <div class="num">
              <div class="color">预定单价</div>
              <div>111</div>
            </div>
            <div>
              <van-stepper v-model="value" />
            </div>
          </div>
        </div>
      </div>
      <!-- 交易方式 运费 留言 -->
      <div>
        <van-form>
          <van-field
            v-model="remark"
            name="留言"
            label="留言"
            placeholder="留言"
          />
        </van-form>
      </div>
    </div>
    <!-- 提交订单 -->
    <div class="layoutBottom">
      <div class="totalPrice">
        <div class="priceText">{{$t("sapc.order.totalPrice")}}</div>
        <div class="price">¥49</div>
      </div>
      <div class="layoutBottomBtn">
        <van-button
          type="warning"
          size="large"
        >{{$t("sapc.common.submitOrder")}}</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfirmOrder',
  data () {
    return {
      value: 0,
      remark: ''
    }
  }
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
    .address {
      background-image: url(../../assets/orderBackground.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      height: 184px;
      padding: 20px;
      .firstLine {
        font-size: 26px;
        opacity: 80%;
        color: rgba(0, 0, 0, 0.7);
        margin: 12px 0 20px;
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
        .iconfont {
          font-size: 40px;
          width: 160px;
          display: flex;
          justify-content: flex-end;
        }
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
          height: 100px;
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
  .layoutBottom {
    display: flex;
    overflow: hidden;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .totalPrice {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      flex-grow: 1;
      padding-right: 20px;
      .priceText {
        font-size: 30px;
        color: rgba(0, 0, 0, 0.85);
      }
      .price {
        font-size: 40px;
        color: orange;
        font-weight: 500;
        margin-left: 10px;
      }
    }
    .layoutBottomBtn {
      display: flex;
      width: 200px;
      flex-shrink: 0;
      flex-direction: row;
    }
  }
  //保证ipx以上的底部导航安全距离
  @supports (bottom: env(safe-area-inset-bottom)) {
    .layoutBottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
</style>