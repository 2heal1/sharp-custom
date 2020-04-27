<template>
  <div class="commentListComView">
    <div
      v-if="!!!Object.keys(info).length"
      class="emptyData"
    >
      <i class="iconfont icon-empty"></i>
      暂无数据
    </div>
    <!-- 列表 -->
    <div
      class="comment"
      v-else
    >
      <!-- 标题 -->
      <div class="commentTitle">
        <div class="textSize">{{$t("sapc.common.info")}}</div>
      </div>
      <!-- 内容 -->
      <div
        v-for="(item,index) in info"
        :key="index"
        class="commentContent"
      >
        <!-- 用户信息 -->
        <div class="commentUser">
          <div>{{item.origin}}</div>
          <div>{{item.time}}</div>
        </div>
        <!-- 内容 -->
        <div class="commentMain">
          {{item.message}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userHttp from "@/actions/user";
export default {
  name: 'InfoList',
  data () {
    return {
      info: {}
    }
  },
  methods: {
    /** 
 * @Author: zhanghang 
 * @Date: 2020-04-10 11:01:34 
 * @Desc: 获取商品评论信息 
 */
    getInfos () {
      userHttp
        .getInfos(this.$store.state.userInfo.id)
        .then(res => {
          if (res.status === 200) {
            this.info = res.data.response;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted () {
    this.getInfos()
  }
}
</script>
<style lang="less" scoped>
.commentListComView {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  .emptyData {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    height: 100%;
    padding: 20px;
    font-size: 36px;
    .iconfont {
      font-size: 120px;
      margin-bottom: 20px;
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
        justify-content: space-between;
        width: 100%;
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
}
</style>