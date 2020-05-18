<template>
  <van-form
    validate-first
    ref="myForm"
    @failed="onFailed"
    @submit="submitForm"
    class="registItem"
  >
    <van-field
      :label="$t('sapc.loginRegister.userName')"
      prop="username"
      v-model="ruleForm.username"
    />
    <van-field
      :label="$t('sapc.loginRegister.phone')"
      type="number"
      :maxlength="11"
      v-model="ruleForm.phone"
      :rules="myRules.phoneRule"
    />
    <van-field
      :label="$t('sapc.loginRegister.password')"
      prop="password"
      type="password"
      v-model="ruleForm.password"
      :rules="myRules.passwordRule"
    />
    <van-field
      :label="$t('sapc.loginRegister.email')"
      prop="email"
      v-model="ruleForm.email"
    />
    <div class="btn">
      <van-button
        type="default"
        size="large"
        native-type="submit"
      > {{$t("sapc.loginRegister.register")}}</van-button>
    </div>
  </van-form>
</template>
<script>
import rules from "@/utils/rule";
import loginHttp from "@/actions/login";
export default {
  data () {
    return {
      rules,
      languageObj: {
        'zh_CN': 0,
        'en_US': 1,
        'en_ES': 2,
      },
      myRules: {
        phoneRule: [
          {
            ...rules.phoneRule,
            required: true,
            trigger: "onBlur",
            message: this.$t("sapc.rule.pleaseInputPhone")
          }
        ],
        passwordRule: [
          {
            ...rules.passwordRule,
            required: true,
            trigger: "onBlur",
            message: this.$t("sapc.rule.pleaseInputPassword")
          }
        ]
      },
      activeName: "first",
      ruleForm: {
        phone: "",
        password: "",
        email: "",
      }
    };
  },
  methods: {
    onFailed (errorInfo) {
      console.log("failed", errorInfo);
    },
    //选项卡切换
    handleClick () { },
    //提交表单
    submitForm () {
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
  },
  mounted () {
    let cur = sessionStorage.getItem('language')
    if (cur) {
      this.value1 = this.languageObj[cur]
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
