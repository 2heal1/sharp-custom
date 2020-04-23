<template>
  <div class="productListView">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="child"
      @click="jumpToOthers(item._id)"
    >
      <img v-lazy="item.imgUrl" />
      <div class="title">{{ item.title }}</div>
      <div class="des">{{ item.dec }}</div>
      <div class="price">{{ '¥ '+(item.discount*item.minPrice/1000).toFixed(2)}}</div>
      <div>
        <van-tag
          round
          :type="tag.type"
          v-for="(tag, tagIndex) in item.tag"
          :key="tagIndex"
          class="tag"
        >{{ tag.label }}</van-tag>
      </div>
      <div class="des">{{ $t("sapc.common.saleVolume", [item.saleVolume]) }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductList",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    jumpToOthers (id) {
      this.$router.push({ path: '/productDetail/' + id, query: { type: this.$route.params.type } })
    }
  }
};
</script>

<style lang="less" scoped>
.productListView {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: space-between;
  .child {
    width: 48%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background-color: white;
    .title {
      padding-left: 4px;
      font-size: 16px;
      white-space: nowrap;
      color: dimgray;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .des {
      padding-left: 4px;
      font-size: 10px;
      color: gray;
    }
    .price {
      padding-left: 4px;
      font-size: 16px;
      color: red;
    }
    .tag {
      margin-right: 4px;
    }
  }
}
</style>
