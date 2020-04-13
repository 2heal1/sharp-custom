<template>
  <div>
    ShoppingCar
    <van-button @click="jumpToOthers">11</van-button>
  </div>
</template>
<script>
export default {
  name: 'ShoppingCar',
  methods: {
    jumpToOthers () {
      this.$router.push({ path: '/order/confirmOrder', query: { type: 1, buyNow: false } })
    }
  }
}
</script>