<template>
  <div class="confirmOrderView">
    <div class="layoutContent">
      <!-- 收件人信息 -->
      <div class="address">
        <div class="firstLine">
          <span>{{$t("sapc.common.name")}}</span>
          <span class="phone">{{userInfo.phone}}</span>
        </div>
        <div
          class="secondLine"
          @click="jumpToAddressList"
        >
          <div>{{address}}</div>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <!-- 商品信息 -->
      <div
        class="product"
        v-for="(item,index) in data"
        :key="index"
      >
        <div class="picInfo">
          <img :src="item.imgUrl">
          <div>{{item.title}}</div>
        </div>
        <div class="params">
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
                <van-stepper v-model="item.num" />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="numType">
              <div class="num">
                <div class="color">{{$t("sapc.common.orderPrice")}}</div>
                <div>{{'¥ '+(item.discount*item.price/1000).toFixed(2)}}</div>
              </div>
              <div>
                <van-stepper v-model="item.num" />
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
            :name="$t('sapc.common.unitPrice')"
            :label="$t('sapc.common.unitPrice')"
            :placeholder="$t('sapc.common.remarkPlaceHolder')"
          />
        </van-form>
      </div>
    </div>
    <!-- 提交订单 -->
    <div class="layoutBottom">
      <div class="totalPrice">
        <div class="priceText">{{$t("sapc.order.totalPrice")}}</div>
        <div class="price">{{'¥ '+(totalPrice/1000).toFixed(2)}}</div>
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
import userHttp from "@/actions/user";
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ConfirmOrder',
  computed: {
    ...mapState(['userInfo', 'productInfo', 'selectedAddress']),
    isNow () {
      //判断是预定还是现货 
      // type=1 现货 
      // type=0 预定 
      return String(this.$route.query.type) == '1'
    },
    totalPrice () {
      let curPrice = this.data.reduce((pre, cur) => pre + cur.price * cur.discount, 0)
      let prePrice = this.isNow ? 0 : curPrice;
      let nowPrice = this.isNow ? curPrice : 0;
      let curNum = this.data.reduce((pre, cur) => pre + cur.num, 0)
      let nowNum = this.isNow ? curNum : 0;
      let preNum = this.isNow ? 0 : curNum;
      return nowPrice * nowNum + preNum * prePrice
    }
  },

  data () {
    return {
      value: 0,
      remark: '',
      data: [],
      address: '暂未填写地址'
    }
  },
  methods: {
    ...mapMutations(["saveToken", "saveUserInfo", "saveProductInfo", 'saveSelectedAddress']),
    async submitOrder () {
      if (!this.address) {
        this.$toast({
          type: 'fail',
          message: '请先填写地址',
          onClose: function () {
            return;
          }
        });
      } else {
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
          let data = this.data;
          let curPrice = data.reduce((pre, cur) => pre + cur.price * cur.discount, 0)
          let curNum = data.reduce((pre, cur) => pre + cur.num, 0)
          let params = {
            id: this.userInfo.id,
            product: data,
            prePrice: this.isNow ? 0 : curPrice,
            nowPrice: this.isNow ? curPrice : 0,
            nowNum: this.isNow ? curNum : 0,
            preNum: this.isNow ? 0 : curNum,
            remark: this.remark
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
      }

    },
    getParams () {
      //判断是否是从商品过来 还是购物车过来
      //buyNow=true 从商品过来 ，拿之前存储的信息
      //buyNow=false 从购物车过来，调接口获取
      if (this.$route.query.buyNow !== String(false)) {
        this.data = [this.productInfo].filter(item => item.now == this.isNow)
      } else {
        productHttp.getShopCar({ id: this.userInfo.id }).then(res => {
          this.data = res.data.response.filter(item => item.now == this.isNow)
        })
      }
    },
    getDefaultAddress () {
      userHttp.getDefaultAddress(this.userInfo.id).then(res => {
        if (res.data.success) {
          this.address = res.data.response.province + res.data.response.city + res.data.response.county + res.data.response.addressDetail
        }
      })
    },
    jumpToAddressList () {
      this.$router.push('/personal/managerAddress')
    }
  },
  created () {
    if (!Object.keys(this.userInfo).length) {
      this.saveToken(sessionStorage.getItem('token'));
      this.saveUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
      this.saveProductInfo(JSON.parse(sessionStorage.getItem('productInfo')));
    }
    this.getParams()
    this.getDefaultAddress()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name == 'ManagerAddress' && sessionStorage.getItem('selectedAddress')) {
      next(vm => {
        vm.address = JSON.parse(sessionStorage.getItem('selectedAddress'))
        vm.$nextTick(function () {
          vm.saveSelectedAddress(JSON.parse(sessionStorage.getItem('selectedAddress')))
        })
      })
    } else {
      next()
    }
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