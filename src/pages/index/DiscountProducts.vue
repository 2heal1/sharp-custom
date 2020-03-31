<template>
  <div class="discountView">
    <div class="title">
      <div>{{ $t("sapc.home.discountProducts") }}</div>
    </div>
    <ProductList :data="discountList" />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList'
export default {
  name: "DiscountProducts",
  components: { ProductList },
  data () {
    return {
      discountList: [
        {
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2055165149,2704025303&fm=26&gp=0.jpg',
          title: '折扣商品1',
          dec: '折扣商品描述',
          tag: [
            {
              type: 'primary',
              label: '满999-100'
            },
            {
              type: 'success',
              label: '满999-100'
            },
            {
              type: 'danger',
              label: '满999-100'
            },
          ],
          saleVolume: '2.1'
        },
        {
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2055165149,2704025303&fm=26&gp=0.jpg',
          title: '折扣商品1',
          dec: '折扣商品描述',
          tag: [
            {
              type: 'primary',
              label: '满999-100'
            },
            {
              type: 'success',
              label: '满999-100'
            },
            {
              type: 'danger',
              label: '满999-100'
            },
          ],
          saleVolume: '2.1'
        },
        {
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2055165149,2704025303&fm=26&gp=0.jpg',
          title: '折扣商品1',
          dec: '折扣商品描述',
          tag: [
            {
              type: 'primary',
              label: '满999-100'
            },
            {
              type: 'success',
              label: '满999-100'
            },
            {
              type: 'danger',
              label: '满999-100'
            },
          ],
          saleVolume: '2.1'
        },
        {
          imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2055165149,2704025303&fm=26&gp=0.jpg',
          title: '折扣商品1',
          dec: '折扣商品描述',
          tag: [
            {
              type: 'primary',
              label: '满999-100'
            },
            {
              type: 'success',
              label: '满999-100'
            },
            {
              type: 'danger',
              label: '满999-100'
            },
          ],
          saleVolume: '2.1'
        }
      ]
    }
  },
  mounted () {

  }
};
</script>
<style lang="less">
.discountView {
  padding: 0 10px;
  .title {
    font-size: 32px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.88);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>
