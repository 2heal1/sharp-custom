<template>
  <div class="orderListView">
    <van-tabs
      v-model="active"
      @click="onTabClick"
    >
      <van-tab
        v-for="item in data"
        :key="item.type"
        :title="item.title"
      >
        <van-loading
          type="spinner"
          v-if="showLoading"
        />
        <ShopCarCom
          v-else
          :type="item.type"
          :shopCarList="shopCarList"
          @update:shopCarList="updateData($event)"
          :selected="selected"
          @update:selected="selectAllOptions($event)"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import ShopCarCom from '@/components/ShopCarCom'
import productHttp from '@/actions/product'
export default {
  name: 'ShoppingCar',
  components: { ShopCarCom },
  data () {
    return {
      active: 0,
      data: [
        {
          title: '现货商品',
          type: 1
        },
        {
          title: '预定商品',
          type: 0
        }
      ],
      shopCarList: [],
      showLoading: false,
    };
  },
  computed: {
    selected () {
      return this.shopCarList.filter(item => item.checked == true)
    }
  },
  methods: {
    getShopCarListList (type) {
      this.showLoading = true
      productHttp.getShopCarByType({ id: this.$store.state.userInfo.id, type }).then(res => {
        if (res.data.code == 200) {
          this.shopCarList = res.data.response.map(item => {
            item.checked = false
            return item
          })
        }
        this.showLoading = false
      })
    },
    onTabClick () {
      this.getShopCarListList(this.data[this.active].type)
    },
    updateData (val) {
      this.shopCarList[val[1]].checked = val[0];
    },
    selectAllOptions (val) {
      // this.shopCarList.forEach((item, index) => {
      //   this.shopCarList[index] = Boolean(val)
      // })
      this.shopCarList = this.shopCarList.map(item => {
        return Object.assign({}, item, {
          checked: val
        })
      })
    }
  },
  mounted () {
    this.getShopCarListList(0)
  }
}
</script>
<style lang="less" scoped>
.orderListView {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: rgba(187, 187, 187, 0.12);
  /deep/.van-tabs__content {
    height: calc(100% - 44px);
  }
  /deep/.van-tabs {
    height: 100%;
  }
  /deep/.van-tab__pane {
    height: 100%;
  }
}
</style>