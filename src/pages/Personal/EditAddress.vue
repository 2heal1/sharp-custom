<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="changeArea"
    />
  </div>
</template>
<script>
import { Toast } from 'vant';
import areaList from '@/assets/areaList'

export default {
  name: 'EditAddress',
  data () {
    return {
      areaList,
    };
  },
  methods: {
    onSave (content) {
      console.log(JSON.stringify(content))
      Toast('save');
    },
    onDelete () {
      Toast('delete');
    },
    changeArea (values) {
      console.log(values)
    }
  },
};
</script>

