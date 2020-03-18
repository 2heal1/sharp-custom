<template>
  <div class="newGoodsView">
    <div class="title">
      <div>{{ $t("sapc.home.newArrival") }}</div>
      <div span="8" class="viewMore">
        {{ $t("sapc.common.viewMore") }}
        <i class="iconfont icon-arrow-right"></i>
      </div>
    </div>
    <div class="content">
      <div v-for="(item, index) in newGoodsDta" :key="index" class="child">
        <div class="text">
          <div>{{ item.date }}</div>
          <div class="price">¥{{ item.price }}</div>
        </div>
        <div>
          <img :src="item.imgUrl" style="width:90px;height:90px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import testImg from "@/assets/logo.png";
export default {
  name: "NewGoods",
  data() {
    return {
      newGoodsDta: [
        {
          date: "03/19",
          price: "299",
          imgUrl: testImg
        },
        {
          date: "03/19",
          price: "299",
          imgUrl: testImg
        },
        {
          date: "03/19",
          price: "299",
          imgUrl: testImg
        },
        {
          date: "03/19",
          price: "299",
          imgUrl: testImg
        },
        {
          date: "03/19",
          price: "299",
          imgUrl: testImg
        }
      ]
    };
  }
};
</script>

<style lang="less">
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
