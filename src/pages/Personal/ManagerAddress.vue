<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :switchable="true"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
  </div>
</template>
<script>
import userHttp from "@/actions/user";
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ManagerAddress',
  computed: {
    ...mapState(['userInfo']),
  },
  data () {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
    };
  },
  methods: {
    ...mapMutations(['saveSelectedAddress', 'saveToken', 'saveUserInfo']),
    onSelect (item) {
      this.saveSelectedAddress(item)
      sessionStorage.setItem('selectedAddress', JSON.stringify(item))
      this.$router.go(-1)
    },
    onAdd () {
      this.$router.push('addAddress')
    },
    onEdit (item) {
      this.$router.push('editAddress/' + item.id)
    },
    getAddressList () {
      userHttp
        .getAddressList(this.userInfo.id)
        .then(res => {
          if (res.status === 200) {
            this.list = res.data.response.map(item => {
              item.id = item._id
              return item
            });
            let index = this.list.findIndex(item => item.isDefault == true)
            if (index !== -1) {
              let cur = Object.assign({}, this.list[index]);
              this.list.splice(index, 1);
              this.list.unshift(cur)
            }
            this.chosenAddressId = this.list[0].id
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

  },
  created () {
    if (!Object.keys(this.userInfo).length) {
      this.saveToken(sessionStorage.getItem('token'));
      this.saveUserInfo(JSON.parse(sessionStorage.getItem('userInfo')));
    }
  },
  mounted () {
    this.getAddressList()
  }
};
</script>

