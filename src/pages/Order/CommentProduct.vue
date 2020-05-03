<template>
  <div class="confirmOrderView">
    <div class="layoutContent">
      <!-- 商品信息 -->
      <div
        class="product"
        @click="jumpToDetails(data)"
      >
        <div class="picInfo">
          <img :src="data.imgUrl">
          <div>{{data.title}}</div>
        </div>
      </div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        :label="$t('sapc.order.comment')"
        type="textarea"
        maxlength="50"
        :placeholder="$t('sapc.order.pleaseInputComment')"
        show-word-limit
      />
      <div class="commentBtn">
        <van-button
          type="default"
          @click="addComment"
        >{{$t('sapc.order.commentNow')}}</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import productHttp from "@/actions/product";
import orderHttp from "@/actions/orders";
import { mapState } from 'vuex'
import orderStatus from '@/utils/orderStatus'

export default {
  name: 'CommentProduct',
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
      data: [],
      message: '',
    }
  },
  methods: {
    getDiscountProductInfoById () {
      productHttp
        .getProductInfo({ id: this.$route.params.id, productType: this.$route.query.type })
        .then(res => {
          if (res.status === 200) {
            this.data = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    jumpToDetails (item) {
      let length = String(item.colorType).length
      let length2 = String(item.type).length
      let totalLength = length + length2 + 1
      let id = item.productId.slice(0, item.productId.length - totalLength)
      this.$router.push({ path: '/productDetail/' + id, query: { type: item.productType } })
    },
    addComment () {
      let self = this
      orderHttp.addComment({
        productId: this.$route.params.id,
        colorType: this.$route.query.colorType,
        comment: this.message,
        avatar: this.$store.state.userInfo.avatar,
        nickName: this.$store.state.userInfo.username,
        completeId: this.$route.query.completeId,
        orderId: this.$route.query.orderId,
      })
        .then(res => {
          if (res.status === 200) {
            this.$toast({
              type: res.data.success ? 'success' : 'fail',
              message: res.data.message,
              onClose: function () {
                self.$router.go(-1)
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created () {
    this.getDiscountProductInfoById()
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
    }
  }
  .commentBtn {
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
    z-index: 999;
  }
}
</style>