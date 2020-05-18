<template>
  <div class="loginItem">
    <van-tabs
      v-model="activeName"
      @click="handleClick"
    >
      <van-tab
        :title="$t('sapc.loginRegister.login')"
        name="first"
      >
        <van-form
          validate-first
          ref="myForm"
          @failed="onFailed"
          @submit="submitForm"
        >
          <van-field
            :label="$t('sapc.loginRegister.phone')"
            type="number"
            :maxlength="11"
            v-model="ruleForm.phone"
            :rules="myRules.phoneRule"
          />
          <van-field
            :label="$t('sapc.loginRegister.password')"
            type="password"
            v-model="ruleForm.password"
            :rules="myRules.passwordRule"
          />
          <div class="btn">
            <van-button
              type="default"
              size="large"
              native-type="submit"
            >{{$t("sapc.loginRegister.login")}}</van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab
        :title="$t('sapc.loginRegister.register')"
        name="second"
      >
        <register />
      </van-tab>
    </van-tabs>
    <van-dropdown-menu class="chooseLanguage">
      <van-dropdown-item
        v-model="value1"
        :options="option1"
        @change="onChange"
      />
    </van-dropdown-menu>
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
  data () {
    return {
      routeQuery: "",
      rules,
      option1: [
        { text: '中文', value: 0 },
        { text: 'English', value: 1 },
        { text: 'Español', value: 2 },
      ],
      languageObj: {
        'zh_CN': 0,
        'en_US': 1,
        'en_ES': 2,
      },
      value1: 0,
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
    ...mapMutations(["saveToken", "saveUserInfo", 'saveLanguage']),
    onFailed (errorInfo) {
      console.log("failed", errorInfo);
    },
    onChange (index) {
      if (index == 0) {
        this.$i18n.locale = 'zh_CN'
        this.saveLanguage('zh_CN')
        sessionStorage.setItem('language', 'zh_CN')
      } else if (index == 1) {
        this.$i18n.locale = 'en_US'
        this.saveLanguage('en_US')
        sessionStorage.setItem('language', 'en_US')
      } else if (index == 2) {
        this.$i18n.locale = 'en_ES'
        this.saveLanguage('en_ES')
        sessionStorage.setItem('language', 'en_ES')
      }
    },
    //选项卡切换
    handleClick () { },
    //提交表单
    submitForm () {
      loginHttp
        .login({
          phone: this.ruleForm.phone,
          password: this.ruleForm.password
        })
        .then(res => {
          if (res && res.data.success) {
            sessionStorage.setItem('token', res.data.token)
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            this.saveToken(res.data.token);
            this.saveUserInfo(res.data);
            this.$toast({
              type: "success",
              message: res.data.message,
              onClose: () => {
                let path = Object.keys(this.routeQuery).length
                  ? this.routeQuery.redirect
                  : "/home";
                console.log(path)
                this.$router.replace(path);
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
    this.routeQuery = this.$route.query;
    let cur = sessionStorage.getItem('language')
    if (cur) {
      this.value1 = this.languageObj[cur]
    }
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
  .chooseLanguage {
    margin-top: 20px;
  }
}
</style>
