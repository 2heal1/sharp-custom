<template>
  <div class="indexView">
    <new-goods />
    <div class="title">
      <div>{{ $t("sapc.home.newArrival") }}</div>
    </div>
  </div>
</template>

<script>
import NewGoods from "./NewGoods";
export default {
  name: "Home",
  components: { NewGoods }
};
</script>
<style lang="less">
.indexView {
  display: flex;
  width: 100%;
  .title {
    font-size: 32px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.88);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
