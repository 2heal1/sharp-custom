<template>
  <div class="indexView">
    index
    <new-goods />
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
}
</style>
