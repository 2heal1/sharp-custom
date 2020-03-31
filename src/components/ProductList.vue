<template>
  <div class="productListView">
    <div v-for="(item, index) in data" :key="index" class="child">
      <img v-lazy="item.imgUrl" />
      <div>{{ item.title }}</div>
      <div>{{ item.dec }}</div>
      <div>
        <van-tag
          :type="tag.type"
          v-for="(tag, tagIndex) in item.tag"
          :key="tagIndex"
          >{{ tag.label }}</van-tag
        >
      </div>
      <div>{{ $t("sapc.common.saleVolume", [item.saleVolume]) }}</div>
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
  }
};
</script>

<style lang="less">
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
  }
}
</style>
