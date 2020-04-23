<template>
  <div class="classificationView">
    <van-sidebar
      v-model="activeKey"
      @change="onChange"
      class="sort"
    >
      <van-sidebar-item
        :title="item.typeName"
        v-for="(item,index) in data"
        :key="index"
      />
    </van-sidebar>
    <div>
      <div
        v-for="(item,index) in data"
        :key="item._id"
        v-show="activeKey==index"
        class="detailSort"
      >
        <div class="title">{{item.typeName}}</div>
        <div class="layout">
          <div
            class="pic"
            v-for="(childItem,childIndex) in item.children"
            :key="childIndex"
          >
            <img v-lazy="childItem.imgUrl">
            <div>{{childItem.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import productHttp from '@/actions/product'
export default {
  name: 'Classification',
  data () {
    return {
      activeId: 1,
      activeIndex: 0,
      activeKey: 0,
      data: []
    };
  },
  methods: {
    onChange (index) {
      console.log(index)
    },
    getSortTable () {
      productHttp.getSortTable().then(res => {
        this.data = res.data.response
      })
    }
  },
  mounted () {
    this.getSortTable()
  }
};
</script>
<style lang="less" scoped>
.classificationView {
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  background: rgba(187, 187, 187, 0.12);
  .sort {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    width: 160px;
    height: 100%;
  }
  .detailSort {
    display: flex;
    flex-direction: column;
    .title {
      color: gray;
      font-size: 40px;
    }
    .layout {
      display: flex;
      flex-direction: row;
      padding: 20px;
      flex-wrap: wrap;
      .pic {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 30%;
        padding: 0 12px;
        img {
          width: 100%;
        }
        .text {
          color: gray;
        }
      }
    }
  }
}
</style>