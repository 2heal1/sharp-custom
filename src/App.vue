<template>
  <div
    id="app"
    class="indexView"
  >
    <div class="content">
      <router-view />
    </div>
    <div
      class="bottom"
      v-if="this.isMainPage"
    >
      <div
        class="navigation"
        @click="jumpToOtherPages('home')"
      >
        <i :class="[navigationClass.iconfont, navigationClass.homeClass]"></i>
        <div>{{ $t("sapc.common.home") }}</div>
      </div>
      <div
        class="navigation"
        @click="jumpToOtherPages('classification')"
      >
        <i :class="[
            navigationClass.iconfont,
            navigationClass.classificationClass
          ]"></i>
        <div>{{ $t("sapc.common.classification") }}</div>
      </div>
      <div
        class="navigation"
        @click="jumpToOtherPages('shoppingCar')"
      >
        <i :class="[navigationClass.iconfont, navigationClass.shoppingCarClass]"></i>
        <div>{{ $t("sapc.common.shoppingCar") }}</div>
      </div>
      <div
        class="navigation"
        @click="jumpToOtherPages('personal')"
      >
        <i :class="[navigationClass.iconfont, navigationClass.personalClass]"></i>
        <div>{{ $t("sapc.common.personal") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    navigationClass: {
      get: function name () {
        let pages = this.$route.path.split("/")[1];
        return Object.assign({}, this.originNavigationClass, {
          [pages + "Class"]:
            this.originNavigationClass[pages + "Class"] + "-fill"
        });
      },
      set: function name () {
        let pages = this.$route.path.split("/")[1];
        this.navigationClass = Object.assign({}, this.originNavigationClass, {
          [pages + "Class"]:
            this.originNavigationClass[pages + "Class"] + "-fill"
        });
      }
    },
    isMainPage () {
      return this.$route.path.split('/').length <= 2
    }
  },
  data () {
    return {
      navigationClass1: {
        iconfont: "iconfont",
        homeClass: "icon-home",
        classificationClass: "icon-all",
        shoppingCarClass: "icon-cart-Empty",
        personalClass: "icon-bussiness-man"
      },
      originNavigationClass: {
        iconfont: "iconfont",
        homeClass: "icon-home",
        classificationClass: "icon-all",
        shoppingCarClass: "icon-cart-Empty",
        personalClass: "icon-bussiness-man"
      }
    };
  },
  methods: {
    jumpToOtherPages (pages) {
      this.$router.push({ path: '/' + pages });
    }
  }
};
</script>
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
    .navigation {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 12px;
      i {
        font-size: 60px;
      }
    }
  }
  //保证ipx以上的底部导航安全距离
  @supports (bottom: env(safe-area-inset-bottom)) {
    .bottom {
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
</style>
