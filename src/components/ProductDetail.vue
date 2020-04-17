<template>
  <div class="productDetail">
    <!-- 内容 -->
    <div class="layoutContent">
      <!-- 轮播 -->
      <van-swipe
        :autoplay="3000"
        class="swipe"
      >
        <van-swipe-item
          v-for="(image, index) in data.imgUrlArr"
          :key="index"
        >
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 折扣价 -->
      <div class="discountPrice">
        {{'¥ '+(data.discount*data.minPrice/1000).toFixed(2)}}
        {{'- ¥ '+(data.discount*data.maxPrice/1000).toFixed(2)}}
      </div>
      <!-- 原价 -->
      <div class="price">
        {{$t('sapc.product.price')}}
        <span>{{((data.minPrice)/1000).toFixed(2)}}</span>
        -
        <span>{{((data.maxPrice)/1000).toFixed(2)}}</span>
      </div>
      <!-- 标题+参数按钮+分享按钮 -->
      <div class="title">
        <!-- 标题 -->
        <div> {{data.title}}</div>
        <!-- 参数 -->
        <div class="child">
          <div class="params">
            <i class="iconfont icon-conditions"></i>
            <div class="text">{{$t("sapc.common.params")}}</div>
          </div>
          <!-- 分享 -->
          <div class="params">
            <i class="iconfont icon-share"></i>
            <div class="text">{{$t("sapc.common.share")}}</div>
          </div>
        </div>
      </div>
      <!-- 描述+销量 -->
      <div class="dec">
        <div>{{data.dec}}</div>
        <div>{{ $t("sapc.common.saleVolume", [data.saleVolume]) }}</div>
      </div>
      <!-- 选择颜色分类 -->
      <div
        class="selectSort"
        @click="showPopup"
      >
        <i class="iconfont icon-select-sort"></i>
        <div class="typeChild">
          <div class="text">{{ $t("sapc.product.pleaseChooseColorType") }}</div>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <van-popup
        v-model="show"
        closeable
        close-icon="close"
        position="bottom"
        safe-area-inset-bottom
        :style="{ height: '70%' }"
      >
        <div class="popUp">
          <!-- 当前选择 -->
          <div class="choose">
            <img
              :src="data.imgUrl"
              class="chooseImg"
            >
            <div class="chooseInfo">
              <div class="choosePrice">{{choosePrice}}</div>
              <div>{{$t("sapc.common.left")}}{{chooseShop.left}} </div>
              <div>{{$t("sapc.common.choosed")}}{{':"'+chooseShop.content+'"'}}</div>
            </div>
          </div>
          <!-- 颜色分类 -->
          <div class="popColor">
            <div class="colorText">{{$t("sapc.common.colorType")}}</div>
            <div class="childCorolr">
              <div
                v-for="(item,index) in data.colorType"
                :class="{childContent:true,selectedContent:item.type==chooseShop.type}"
                :key="index"
                @click="changeSelected(item)"
              >
                <img :src="item.imgUrl">
                <div>{{item.content}}</div>
              </div>
            </div>
          </div>
          <!-- 是否购买现货 -->
          <div
            class="chooseNum"
            key="12341"
          >
            <div class="chooseNumText">{{$t("sapc.common.orderType")}}</div>
            <div>
              <van-radio-group
                v-model="buyNow"
                direction="horizontal"
              >
                <van-radio
                  name="1"
                  checked-color="#ff976a"
                >{{$t("sapc.common.buyNowProduct")}}</van-radio>
                <van-radio
                  name="0"
                  checked-color="#ff976a"
                >{{$t("sapc.common.preProduct")}}</van-radio>
              </van-radio-group>
            </div>
          </div>
          <!-- 购买数量 -->
          <div
            class="chooseNum"
            v-if="buyNow==1"
            key="12341354"
          >
            <div class="chooseNumText">{{$t("sapc.common.shopNum")}}</div>
            <div>
              <van-stepper
                v-model="selectedNum"
                min="1000"
                :max="chooseShop.left"
              />
            </div>
          </div>
          <!-- 预定数量 -->
          <div
            class="chooseNum"
            v-else
            key="preNum"
          >
            <div class="chooseNumText">{{$t("sapc.common.preNum")}}</div>
            <div>
              <van-stepper
                v-model="preSelectedNum"
                min="0"
              />
            </div>
          </div>
          <!-- 备注 -->
          <div class="chooseDec">
            <div class="chooseDecTitle">{{$t("sapc.common.remark")}}</div>
            <div class="chooseDecText">{{$t("sapc.common.leastOrder")}}</div>
            <div class="chooseDecText">{{$t("sapc.common.preOrder")}}</div>
          </div>
          <!-- 底部操作按钮 -->
          <div class="chooseBtn">
            <van-button
              type="warning"
              size="large"
              @click="addShopCar"
            >{{$t("sapc.common.addToShopCar")}}</van-button>
            <van-button
              type="danger"
              size="large"
              @click="jumpToOrder"
            >{{$t("sapc.common.buyNow")}}</van-button>
          </div>
        </div>
      </van-popup>
      <!-- 商品评价 -->
      <div class="comment">
        <!-- 评价标题 -->
        <div class="commentTitle">
          <div class="textSize">{{$t("sapc.product.productComment")}}{{'（'+comment.num+'）'}}</div>
          <div class="commentViewMore">
            <div>{{$t('sapc.common.viewMore')}}</div>
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </div>
        <!-- 评价标签 -->
        <div class="commentTag">
          <van-tag
            round
            size="medium"
            :type="tag.type"
            v-for="(tag, tagIndex) in comment.tag"
            :key="tagIndex"
            class="tagDetail"
          >{{ tag.title }}</van-tag>
        </div>
        <!-- 评论内容 -->
        <div
          v-for="(item,index) in comment.data"
          :key="index"
          class="commentContent"
        >
          <!-- 用户信息 -->
          <div class="commentUser">
            <img :src="item.avatar">
            <div>{{item.nickName}}</div>
          </div>
          <!-- 内容 -->
          <div class="commentMain">
            {{item.content}}
          </div>
          <!-- 商品类别 -->
          <div class="commentColorType">
            {{$t("sapc.product.colorType", [item.colorType])}}
          </div>
        </div>
      </div>
      <!-- 图文详情 -->
      <div class="picDetail">
        <!-- 评价标题 -->
        <div class="picDetailTitle">
          <div class="textSize">{{$t("sapc.product.picTextDetail")}}</div>
        </div>
        <div v-html="data.picDetail"></div>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="layoutBottom">
      <div class="navigation">
        <i class="iconfont icon-collection"></i>
        <div>{{ $t("sapc.common.collection") }}</div>
      </div>
      <div class="layoutBottomBtn">
        <van-button
          @click="showPopup"
          type="warning"
          size="large"
        >{{$t("sapc.common.addToShopCar")}}</van-button>
        <van-button
          @click="showPopup"
          type="danger"
          size="large"
        >{{$t("sapc.common.buyNow")}}</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import homeHttp from "@/actions/home";
import productHttp from "@/actions/product";
import { mapState, mapMutations } from 'vuex'
export default {
  name: "ProductDetail",
  computed: {
    ...mapState(['userInfo']),
    choosePrice () {
      return this.chooseShop.price * this.selectedNum / 1000
    }
  },
  data () {
    return {
      data: {},
      comment: {},
      chooseShop: {},
      show: false,
      selectedNum: 1000,
      preSelectedNum: 0,
      buyNow: "1",
      picDetail: null
    }
  },
  methods: {
    ...mapMutations(['saveProductInfo']),
    /** 
     * @Author: zhanghang 
     * @Date: 2020-04-10 11:01:21 
     * @Desc: 获取商品信息 
     */
    getDiscountProductInfoById () {
      homeHttp
        .getDiscountProductInfoById(this.$route.params.id)
        .then(res => {
          if (res.status === 200) {
            this.data = res.data.response;
            this.chooseShop = Object.assign({}, res.data.response.colorType[0])
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 
     * @Author: zhanghang 
     * @Date: 2020-04-10 11:01:34 
     * @Desc: 获取商品评论信息 
     */
    getProductCommentById () {
      productHttp
        .getProductCommentById(this.$route.params.id)
        .then(res => {
          if (res.status === 200) {
            this.comment = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 
     * @Author: zhanghang 
     * @Date: 2020-04-10 11:01:40 
     * @Desc: 增加现货至购物车 
     * @params type 商品类别
     * @params productId 商品id
     * @params id 用户id
     * @params num 商品数量
     * @params preNum 预定商品数量
     * @params colorType 商品颜色类别
     */
    addToShopCar () {
      let params = Object.assign({}, {
        type: this.data.type,
        id: this.userInfo.id,
        productId: this.data._id,
        num: this.selectedNum,
        colorType: this.chooseShop.type
      });
      productHttp
        .addToShopCar(params)
        .then(res => {
          if (res.status === 200) {
            this.$toast({
              type: res.data.success ? 'success' : 'fail',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /** 
     * @Author: zhanghang 
     * @Date: 2020-04-10 11:01:40 
     * @Desc: 增加预定商品至购物车 
     * @params type 商品类别
     * @params productId 商品id
     * @params id 用户id
     * @params preNum 预定商品数量
     * @params colorType 商品颜色类别
     */
    addPreToShopCar () {
      if (this.preSelectedNum < 1000) {
        this.$toast({
          type: 'fail',
          message: this.$t('sapc.common.preOrder')
        });
        return
      }
      let params = Object.assign({}, {
        type: this.data.type,
        id: this.userInfo.id,
        productId: this.data._id,
        preNum: this.preSelectedNum,
        colorType: this.chooseShop.type
      });
      productHttp
        .addPreToShopCar(params)
        .then(res => {
          if (res.status === 200) {
            this.$toast({
              type: res.data.success ? 'success' : 'fail',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addShopCar () {
      this.buyNow == '1' ? this.addToShopCar() : this.addPreToShopCar()
    },
    jumpToOrder () {
      if (!this.userInfo) {
        this.$router.replace({
          //跳转到登录页面
          path: "/loginRegist",
          query: { redirect: this.$router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        });
      } else {
        let params = {
          productId: this.data._id + this.chooseShop.type,
          title: this.data.title,
          content: this.chooseShop.content,
          left: this.chooseShop.left,
          now: this.buyNow == 1 ? true : false,
          pre: this.buyNow == 1 ? false : true,
          num: this.selectedNum,
          preNum: this.preSelectedNum,
          discount: this.chooseShop.discount,
          price: this.chooseShop.price,
          imgUrl: this.chooseShop.imgUrl,
          type: this.data.type,
          colorType: this.chooseShop.type,
        }
        this.saveProductInfo(params)
        sessionStorage.setItem('productInfo', JSON.stringify(params))
        // type=1 现货 
        // type=0 预定 
        this.$router.push({ path: '/order/confirmOrder', query: { type: this.buyNow, buyNow: true } })
      }
    },
    showPopup () {
      this.show = true;
    },
    changeSelected (e) {
      this.chooseShop = e
      this.selectedNum = 1000
    }
  },
  mounted () {
    this.getDiscountProductInfoById()
    this.getProductCommentById()
  }
};
</script>

<style lang="less" scoped>
.productDetail {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
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
    .swipe {
      width: 100%;
      height: 450px;
      display: flex;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .discountPrice {
      padding: 0 10px;
      color: #f30037;
      font-size: 48px;
      font-weight: 500;
    }
    .price {
      padding: 0 10px;
      color: rgba(128, 128, 128, 0.71);
      span {
        margin-left: 6px;
        text-decoration: line-through;
      }
    }
    .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 10px;
      margin: 20px 0;
      font-size: 28px;
      color: rgba(0, 0, 0, 0.85);
      flex-shrink: 0;
      .child {
        display: flex;
        flex-direction: row;
        width: 140px;
        flex-shrink: 0;
        .params {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 20px;
          .iconfont {
            font-size: 40px;
            color: gray;
          }
          .text {
            font-size: 20px;
            color: gray;
          }
        }
      }
    }
    .dec {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 10px;
      margin-bottom: 20px;
      color: gray;
      flex-shrink: 0;
    }
    .selectSort {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0 10px;
      align-items: center;
      margin-bottom: 20px;
      .iconfont {
        font-size: 40px;
        color: gray;
        flex-shrink: 0;
      }
      .typeChild {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
        .iconfont {
          font-size: 40px;
          color: gray;
        }
        .text {
          font-size: 20px;
          color: gray;
        }
      }
    }
    .popUp {
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      flex-grow: 1;
      height: 100%;
      .choose {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: 20px;
        .chooseImg {
          width: 180px;
          height: 180px;
          margin-right: 30px;
        }
        .chooseInfo {
          font-size: 26px;
          .choosePrice {
            color: #f30037;
          }
        }
      }
      .popColor {
        display: flex;
        flex-direction: column;
        padding-top: 20px;
        border-top: 1px solid rgba(128, 128, 128, 0.14);
        .colorText {
          font-size: 28px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 20px;
        }
        .childCorolr {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .childContent {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-right: 30px;
            margin-bottom: 20px;
            border-radius: 10px;
            padding: 10px;
            border: 1px solid rgba(128, 128, 128, 0.3215686274509804);
            background-color: rgba(128, 128, 128, 0.04);
            img {
              width: 30px;
              height: 30px;
              margin-right: 10px;
            }
          }
          .selectedContent {
            color: rgba(255, 0, 0, 0.68);
            background-color: rgba(249, 31, 31, 0.04);
            border: 1px solid rgba(239, 0, 0, 0.3215686274509804);
          }
        }
      }
      .chooseNum {
        display: flex;
        flex-direction: row;
        padding-top: 20px;
        justify-content: space-between;
        border-top: 1px solid rgba(128, 128, 128, 0.14);
        .chooseNumText {
          font-size: 28px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 20px;
        }
      }
      .chooseDec {
        display: flex;
        flex-direction: column;
        .chooseDecTitle {
          border-top: 1px solid rgba(128, 128, 128, 0.14);
          padding-top: 20px;
          font-size: 28px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 20px;
        }
        .chooseDecText {
          font-size: 14px;
          color: gray;
        }
      }
      .chooseBtn {
        display: flex;
        flex-grow: 1;
        align-items: flex-end;
        flex-direction: row;
        justify-content: space-between;
      }
    }
    .comment {
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      margin-bottom: 20px;
      font-size: 20px;
      flex-shrink: 0;
      .commentTitle {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        .textSize {
          font-size: 30px;
          color: #1f1f1f;
        }
        .commentViewMore {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: #f7257b;
          font-size: 24px;
          .iconfont {
            font-size: 40px;
            margin-left: 10px;
          }
        }
      }
      .commentTag {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex-shrink: 0;
        .tagDetail {
          margin: 10px 10px 0 0;
        }
      }
      .commentContent {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        color: rgba(0, 0, 0, 0.85);
        width: 100%;
        .commentUser {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 16px;
          width: 100%;
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 1px solid rgba(189, 189, 189, 0.29);
            margin-right: 10px;
          }
          div {
            color: rgba(128, 128, 128, 0.71);
            font-weight: 500;
          }
        }
        .commentColorType {
          margin-top: 10px;
          color: rgba(128, 128, 128, 0.71);
        }
        .commentMain {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          word-break: break-all;
        }
      }
    }
    .picDetail {
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      margin-bottom: 20px;
      font-size: 20px;
      .picDetailTitle {
        display: flex;
        margin-bottom: 20px;
        .textSize {
          font-size: 30px;
          color: #1f1f1f;
        }
      }
    }
  }
  .layoutBottom {
    display: flex;
    overflow: hidden;
    flex-shrink: 0;
    flex-direction: row;
    .navigation {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 50px;
      flex-shrink: 0;
      align-items: center;
      padding: 0 12px;
      i {
        font-size: 50px;
      }
    }
    .layoutBottomBtn {
      display: flex;
      flex-direction: row;
      flex-grow: 1;
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
