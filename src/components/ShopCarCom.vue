<template>
  <div class="shopCarComView">
    <div
      v-if="!!!this.computedShopCar.length"
      class="emptyData"
    >
      <i class="iconfont icon-empty"></i>
      暂无数据
    </div>
    <div
      class="tmop"
      v-else
    >
      <div class="layoutContent">
        <van-swipe-cell
          v-for="(item,index) in computedShopCar"
          :key="index"
        >
          <div class="total">
            <div class="checked">
              <van-checkbox
                checked-color="#ff976a"
                v-model="item.checked"
                @click="(e)=>onChange(e,index)"
              ></van-checkbox>
            </div>
            <div class="product">
              <div
                class="picInfo"
                @click="jumpToOthers(item)"
              >
                <img :src="item.imgUrl">
                <div>{{item.title}}</div>
              </div>
              <div class="params">
                <div class="colorType">
                  <div class="color">{{$t("sapc.common.colorType")}}</div>
                  <div>
                    {{item.content}}
                  </div>
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
          </div>
          <template
            #right
            style="height:100%"
          >
            <van-button
              @click="onDelete(index,item.productId)"
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </div>

      <!-- 提交订单 -->
      <div class="layoutBottom">
        <van-checkbox
          class="checked"
          checked-color="#ff976a"
          v-model="computedSelected"
          @click="selectAll"
        ></van-checkbox>
        <div class="totalPrice">
          <div class="priceText">{{$t("sapc.order.totalPrice")}}</div>
          <div class="price">{{'¥ '+totalPrice}}</div>
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
  </div>
</template>
<script>
import productHttp from "@/actions/product";
import { mapMutations } from 'vuex'
export default {
  name: 'ShopCarCom',
  props: ['type', 'shopCarList', 'selected'],
  data () {
    return {

    }
  },
  computed: {
    isNow () {
      //判断是预定还是现货 
      // type=1 现货 
      // type=0 预定 
      return this.shopCarList.length && this.shopCarList[0].now
    },
    totalPrice () {
      let curPrice = this.selected.reduce((pre, cur) => pre + cur.price / 1000 * cur.discount * cur.num, 0)
      return (curPrice).toFixed(2)
    },
    computedShopCar: {
      get: function () {
        return this.shopCarList
      },
      set: function (val) {
        this.$emit('update:shopCarList', val)
      }
    },
    computedSelected: {
      get: function () {
        return this.selected.length == this.computedShopCar.length
      },
      set: function (val) {
        this.$emit('update:selected', val)
      }
    }
  },
  methods: {
    ...mapMutations(['saveProductInfo']),
    onChange (checked, index) {
      this.computedShopCar = [checked, index]
    },
    selectAll (checked) {
      this.computedSelected = checked
    },
    editShopCar (productId, num) {
      let params = { id: this.$store.userInfo.id, productId, num }
      params.isNow = this.isNow
      productHttp
        .editShopCar(params)
        .then(res => {
          if (res.status === 200) {
            console.log(res)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async deleteShopCar (index, productId) {
      let params = { id: this.$store.state.userInfo.id, productId }
      productHttp
        .deleteShopCar(params)
        .then(res => {
          if (res.data.success) {
            this.$emit('changeData', index)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onDelete (index, productId) {
      let self = this
      this.$dialog.alert({
        message: '确认从购物车中删除该物品吗？',
        showConfirmButton: true,
        showCancelButton: true,
        beforeClose: async function (action, done) {
          if (action == 'confirm') {
            await self.deleteShopCar(index, productId)
            done()
          } else {
            done()
            return;
          }
        }
      });
    },
    jumpToOthers (item) {
      let length = String(item.colorType).length
      let length2 = String(item.type).length
      let totalLength = length + length2 + 1
      let id = item.productId.slice(0, item.productId.length - totalLength)
      this.$router.push({ path: '/productDetail/' + id, query: { type: item.productType } })
    },
    submitOrder () {
      if (this.selected.length == 0) {
        this.$toast({
          type: 'fail',
          message: '请先选择商品'
        });
      } else {
        this.saveProductInfo(this.selected)
        sessionStorage.setItem('productInfo', JSON.stringify(this.selected))
        // type=1 现货 
        // type=0 预定 
        this.$router.push({ path: '/order/confirmOrder', query: { type: Number(this.isNow) } })
      }
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.shopCarComView {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
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
  .tmop {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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
      /deep/.van-button--normal {
        height: 100%;
      }
      .total {
        display: flex;
        flex-direction: row;
        background: white;
        margin: 0 12px 12px;
        .checked {
          padding: 20px 0;
          height: 100px;
          display: flex;
          align-items: center;
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
    }
    .layoutBottom {
      display: flex;
      overflow: hidden;
      flex-shrink: 0;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background-color: white;
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
}
</style>