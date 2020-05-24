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
        <div>
          <i :class="[navigationClass.iconfont, navigationClass.personalClass]"></i>
          <span
            v-if="isVisible"
            class="redPoint"
          ></span>
        </div>
        <div>{{ $t("sapc.common.personal") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import userHttp from '@/actions/user'
import { mapMutations } from 'vuex'
export default {
  name: "App",
  computed: {
    isVisible () {
      return this.$store.state.hasNewInfos
    },
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
      return this.$route.path !== '/loginRegist' && this.$route.path.split('/').length <= 2
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
    ...mapMutations(['saveInfo']),
    jumpToOtherPages (pages) {
      this.$router.push({ path: '/' + pages });
    },
    getInfostatus () {
      userHttp
        .getInfostatus(this.$store.state.userInfo.id)
        .then(res => {
          this.saveInfo(res.data.response)
          console.log(res.data.response)
          sessionStorage.setItem('info', res.data.response)
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted () {
    this.getInfostatus()
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
    .redPoint {
      display: inline-block;
      text-align: center;
      font-size: 0.1em;
      color: #fff;
      background: red;
      height: 12px;
      width: 12px;
      border-radius: 16px;
      position: absolute;
      bottom: 82px;
      right: 8px;
    }
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
