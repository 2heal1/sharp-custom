<template>
  <div class="orderListView">
    <van-tabs
      v-model="active"
      @click="onTabClick"
    >
      <van-tab
        v-for="item in data"
        :key="item.status"
        :title="item.title"
      >
        <van-loading
          type="spinner"
          v-if="showLoading"
        />
        <OrderListCom
          v-else
          :status="item.status"
          :orderList="orderList"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import OrderListCom from '@/components/OrderListCom'
import orderHttp from '@/actions/orders'
export default {
  name: 'OrderList',
  components: { OrderListCom },
  data () {
    return {
      active: 0,
      data: [
        {
          title: '全部订单',
          status: 0
        },
        {
          title: '待接单',
          status: 1
        },
        {
          title: '已接单',
          status: 2
        },
        {
          title: '已发货',
          status: 4
        },
        {
          title: '已签收',
          status: 5
        },
        {
          title: '交易完成',
          status: 7
        },
        {
          title: '交易取消',
          status: 8
        },
      ],
      orderList: [],
      showLoading: false
    };
  },
  methods: {
    getOrderList (status) {
      this.showLoading = true
      orderHttp.getOrderList({ id: this.$store.state.userInfo.id, status }).then(res => {
        if (res.data.code == 200) {
          this.orderList = res.data.response
        }
        this.showLoading = false
      })
    },
    onTabClick () {
      this.getOrderList(this.data[this.active].status)
    }
  },
  mounted () {
    let cur = Object.keys(this.$route.query).length ? Number(this.$route.query.status) : 0
    this.active = this.data.findIndex(item => item.status == cur)
    this.getOrderList(this.active)
  }
}
</script>
<style lang="less" scoped>
.orderListView {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background: rgba(187, 187, 187, 0.12);
  /deep/.van-tabs__content {
    height: 100%;
  }
  /deep/.van-tabs {
    height: 100%;
  }
  /deep/.van-tab__pane {
    height: 100%;
  }
}
</style>