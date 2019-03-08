<template>
  <div id="action_login">
    <div id="logo_bar">
      <img src="@/assets/img/logo.png" alt>
    </div>

    <div class="title_bar" style="margin-bottom: 20px">常熟市食品生产经营监管信息化平台</div>

    <div class="login_bar">
      <el-row style="margin-bottom:26px;">
        <el-col style="text-align: center;" :span="24">
          <span style="font-size:20px;">信息化平台用户登录</span>
        </el-col>
      </el-row>

      <el-form @submit.native="handelSubmit" label-width="55px">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="account" label="账户：">
              <el-input
                v-model="form.account"
                size="small"
                style="width:100%;"
                placeholder="请输入用户账户"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="pwd" label="密码：">
              <el-input
                v-model="form.pwd"
                type="password"
                size="small"
                style="width:100%;"
                placeholder="请输入登录密码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin-top:20px;">
          <el-col :span="24">
            <el-button
              @click="handelSubmit"
              style="width:100%;"
              size="small"
              type="primary"
              icon="el-icon-check"
            >用户登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import Login from "@/api/login.js";
import { getAreaByID } from "@/api/old_area.js";
import { getStaffByID } from "@/api/old_staff.js";

export default {
  name: "action_login",

  data() {
    return {
      form: {
        account: "",
        pwd: ""
      }
    };
  },

  methods: {
    handelSubmit() {
      if (
        this.form.account.trim().length <= 0 ||
        this.form.pwd.trim().length <= 0
      ) {
        return;
      }

      Login({
        usr_account: this.form.account,
        usr_password: this.form.pwd
      }).then(data => {
        if (data.success) {
          this.$store.state.currentUser = data.data;
          sessionStorage.setItem("currentUser", JSON.stringify(data.data));
          this.$router.push("/index");
        } else {
          this.$message.error(`登录失败 ${data.message}`);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#action_login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(../../assets/img/loginbg.jpg);
  background-position: center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title_bar {
    width: 100%;
    height: 50px;

    font-weight: 400;
    font-size: 25px;
    line-height: 50px;
    color: #fff;
    text-align: center;

    &:last-of-type {
      margin-bottom: 30px;
    }
  }

  .login_bar {
    color: #383838;
    padding: 25px 60px;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #404040;
    border-radius: 4px;
    flex-grow: 0;

    .el-row {
      margin-bottom: 0;
    }
  }

  #logo_bar {
    img {
      width: 110px;
      margin: 0 0 20px;
    }
  }

  .el-form-item {
    margin-bottom: 8px;
  }

  & > * {
    position: relative;
    bottom: 50px;
  }
}
</style>
