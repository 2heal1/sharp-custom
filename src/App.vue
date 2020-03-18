<template>
  <div id="app">
    <router-view />
    <div class="title">
      <router-link to="/">{{ $t("sapc.common.home") }}</router-link> |
      <router-link to="/about">{{
        $t("sapc.common.classification")
      }}</router-link>
      <router-link to="/about">{{ $t("sapc.common.orderList") }}</router-link>
      <router-link to="/about">{{ $t("sapc.common.personal") }}</router-link>
    </div>
  </div>
</template>

<style lang="less">
.title {
  color: red;
}
</style>
