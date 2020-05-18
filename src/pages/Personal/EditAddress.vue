<template>
  <div style="width:100%">
    <van-address-edit
      :area-list="areaList"
      show-postal
      :show-delete="$route.name !== 'AddAddress'"
      show-set-default
      show-search-result
      :address-info="data"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-area="changeArea"
      @change-default="changeDefault"
    />
  </div>
</template>
<script>
import { Toast } from 'vant';
import areaList from '@/assets/areaList'
import userHttp from "@/actions/user";
import { mapState } from 'vuex'

export default {
  name: 'EditAddress',
  computed: {
    ...mapState(['userInfo']),
  },
  data () {
    return {
      areaList,
      data: {},
      provinceCode: '',
      cityCode: '',
      areaCode: '',
    };
  },
  methods: {
    onSave (content) {
      console.log(content)
      this.data.name = content.name
      this.data.tel = content.tel
      this.data.addressDetail = content.addressDetail
      this.data.postalCode = content.postalCode
      let self = this;
      if (this.$route.name == 'AddAddress') {
        this.data.userId = this.userInfo.id
        userHttp
          .addAddress(this.data)
          .then(res => {
            if (res.data.code === 200) {
              this.$toast({
                type: res.data.success ? 'success' : 'fail',
                message: res.data.message,
                onClose: function () {
                  self.$router.go(-1)
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        userHttp
          .editAddress(this.data)
          .then(res => {
            if (res.data.code === 200) {
              this.$toast({
                type: res.data.success ? 'success' : 'fail',
                message: res.data.message,
                onClose: function () {
                  self.$router.go(-1)
                }
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }

    },
    onDelete () {
      Toast('delete');
    },
    changeArea (content) {
      this.data.provinceCode = content[0].code
      this.data.province = content[0].name
      this.data.cityCode = content[1].code
      this.data.city = content[1].name
      this.data.areaCode = content[2].code
      this.data.county = content[2].name
    },
    changeDefault (value) {
      this.data.isDefault = value
    },
    getAddressInfo () {
      userHttp
        .getAddressInfo(this.$route.params.id)
        .then(res => {
          if (res.status === 200) {
            this.data = res.data.response.map(item => {
              item.id = item._id
              return item
            })[0];
            this.provinceCode = this.data.provinceCode
            this.cityCode = this.data.cityCode
            this.areaCode = this.data.areaCode
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted () {
    if (this.$route.name !== 'AddAddress') {
      this.getAddressInfo()
    }
  }
};
</script>

