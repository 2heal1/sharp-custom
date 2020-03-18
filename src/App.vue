<template>
  <div id="app" class="indexView">
    <div class="content">
      <i class="iconfont icon-editor"></i>
      <i class="iconfont icon-all"></i>

      <router-view />
    </div>
    <div class="bottom">
      <div>
        <router-link to="/">{{ $t("sapc.common.home") }}</router-link>
      </div>
      <div>
        <router-link to="/about">{{
          $t("sapc.common.classification")
        }}</router-link>
      </div>
      <div>
        <router-link to="/about">{{
          $t("sapc.common.shoppingCar")
        }}</router-link>
      </div>
      <div>
        <router-link to="/about">{{ $t("sapc.common.personal") }}</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.indexView {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-grow: 1;
  height: 100vh;
  .content {
    display: flex;
    overflow: scroll;
    flex-grow: 1;
  }
  .bottom {
    display: flex;
    overflow: hidden;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
