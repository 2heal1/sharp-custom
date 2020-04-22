<template>
  <div class="classificationView">
    <van-sidebar
      v-model="activeKey"
      @change="onChange"
    >
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
      <van-sidebar-item title="标签名称" />
    </van-sidebar>
  </div>
</template>
<script>
export default {
  name: 'Classification',
  data () {
    return {
      activeId: 1,
      activeIndex: 0,
      activeKey: 0,
    };
  },
  methods: {
    onChange (index) {
      console.log(index)
    },
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