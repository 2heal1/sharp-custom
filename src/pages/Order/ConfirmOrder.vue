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
          <div v-if="isNow">
            <div class="numType">
              <div class="num">
                <div class="color">购买单价</div>
                <div>111</div>
              </div>
              <div>
                <van-stepper v-model="value" />
              </div>
            </div>
          </div>
          <div v-else>
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
          @click="submitOrder"
          type="warning"
          size="large"
        >{{$t("sapc.common.submitOrder")}}</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import orderHttp from '@/actions/orders'
import productHttp from '@/actions/product'
import { mapState } from 'vuex'
export default {
  name: 'ConfirmOrder',
  computed: {
    ...mapState(['userInfo', 'productInfo']),
    isNow () {
      //判断是预定还是现货 
      // type=1 现货 
      // type=0 预定 
      return this.$route.query.type == '1'
    }
  },
  data () {
    return {
      value: 0,
      remark: ''
    }
  },
  methods: {
    async submitOrder () {
      if (!this.isNow) {
        this.$dialog.alert({
          message: '该订单为预定订单，是否确认下单？',
          showConfirmButton: true,
          showCancelButton: true,
          beforeClose: function (action, done) {
            if (action == 'confirm') {
              done()
            } else {
              return;
            }
          }
        });
      }
      try {
        let data = await this.getParams();
        data = data.data.response.filter(item => item.now == this.isNow)
        console.log(data)
        let curPrice = data.reduce((pre, cur) => pre + cur.price, 0)
        let curNum = data.reduce((pre, cur) => pre + cur.num, 0)
        let params = {
          id: this.userInfo.id,
          product: data,
          prePrice: this.isNow ? 0 : curPrice,
          nowPrice: this.isNow ? curPrice : 0,
          nowNum: this.isNow ? curNum : 0,
          preNum: this.isNow ? 0 : curNum,
        }
        orderHttp.createOrder(params).then(res => {
          if (res.status === 200) {
            this.$toast({
              type: res.data.success ? 'success' : 'fail',
              message: res.data.message
            });
          }
        }).catch(err => {
          console.log(err);
        });
      } catch (err) {
        console.error(err)
      }
    },
    async getParams () {
      //判断是否是从商品过来 还是购物车过来
      //buyNow=true 从商品过来 ，拿之前存储的信息
      //buyNow=false 从购物车过来，调接口获取
      if (this.$route.query.buyNow) {
        return [this.productInfo]
      } else {
        return productHttp.getShopCar({ id: this.userInfo.id })
      }
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