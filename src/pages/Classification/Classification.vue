<template>
  <div class="classificationView">
    <van-tree-select
      style="height:100%"
      :items="sortList"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
    />
  </div>
</template>
<script>
import sortList from '@/assets/sort'
export default {
  name: 'Classification',
  data () {
    return {
      sortList,
      activeId: 1,
      activeIndex: 0,
    };
  },
};
</script>
<style lang="less" scoped>
.classificationView {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background: rgba(187, 187, 187, 0.12);
}
</style>