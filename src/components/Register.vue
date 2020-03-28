<template>
  <van-form
    validate-first
    ref="myForm"
    @failed="onFailed"
    @submit="submitForm"
    class="registItem"
  >
    <van-field label="用户名" prop="username" v-model="ruleForm.username" />
    <van-field
      label="手机号"
      type="number"
      :maxlength="11"
      v-model="ruleForm.phone"
      :rules="myRules.phoneRule"
    />
    <van-field
      label="密码"
      prop="password"
      type="password"
      v-model="ruleForm.password"
      :rules="myRules.passwordRule"
    />
    <van-field label="邮箱" prop="email" />
    <div class="btn">
      <van-button type="default" size="large" native-type="submit"
        >注册</van-button
      >
    </div>
  </van-form>
</template>
<script>
import rules from "@/utils/rule";
import loginHttp from "@/actions/login";
export default {
  data() {
    return {
      rules,
      myRules: {
        phoneRule: [
          {
            ...rules.phoneRule,
            required: true,
            trigger: "onBlur"
          }
        ],
        passwordRule: [
          {
            ...rules.passwordRule,
            required: true,
            trigger: "onBlur"
          }
        ]
      },
      activeName: "first",
      ruleForm: {
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    //选项卡切换
    handleClick() {},
    //提交表单
    submitForm() {
      loginHttp
        .registe({
          username: this.ruleForm.username,
          email: this.ruleForm.email,
          phone: this.ruleForm.phone,
          password: this.ruleForm.password
        })
        .then(res => {
          if (res && res.data.success) {
            this.$toast({
              type: "success",
              message: res.data.message,
              onClose: () => {
                window.location.reload();
              }
            });
          } else {
            this.$toast({
              type: "fail",
              message: res.data.message
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.registItem {
  width: 100%;
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
