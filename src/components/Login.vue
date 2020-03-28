<template>
  <div class="loginItem">
    <van-tabs v-model="activeName" @click="handleClick">
      <van-tab title="登陆" name="first">
        <van-form
          validate-first
          ref="myForm"
          @failed="onFailed"
          @submit="submitForm"
        >
          <van-field
            label="手机号"
            type="number"
            :maxlength="11"
            v-model="ruleForm.phone"
            :rules="myRules.phoneRule"
          />
          <van-field
            label="密码"
            type="password"
            v-model="ruleForm.password"
            :rules="myRules.passwordRule"
          />
          <div class="btn">
            <van-button type="default" size="large" native-type="submit"
              >登录</van-button
            >
          </div>
        </van-form>
      </van-tab>
      <van-tab title="注册" name="second">
        <register />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import register from "@/components/Register";
import rules from "@/utils/rule";
import { mapMutations } from "vuex";
import loginHttp from "@/actions/login";
export default {
  components: {
    register
  },
  data() {
    return {
      routeQuery: "",
      rules,
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
        password: ""
      }
    };
  },
  methods: {
    ...mapMutations(["saveToken"]),
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    //选项卡切换
    handleClick() {},
    //提交表单
    submitForm() {
      loginHttp
        .login({
          phone: this.ruleForm.phone,
          password: this.ruleForm.password
        })
        .then(res => {
          if (res && res.data.success) {
            this.saveToken(res.data.token);
            this.$toast({
              type: "success",
              message: res.data.message,
              onClose: () => {
                let path = Object.keys(this.routeQuery).length
                  ? this.routeQuery.path
                  : "home";
                this.$router.push(path);
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
  mounted() {
    this.routeQuery = this.$route.query;
  }
};
</script>
<style lang="less" scoped>
.loginItem {
  width: 100%;
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
