<template>
  <div id="action_login">
    <div class="title_bar">
      常熟市食品生产经营监管信息化平台
    </div>

    <div class="login_bar">
      <el-row style="margin-bottom:30px;">
        <el-col :span="24">
          <span style="font-size:20px;">平台用户登录</span>
        </el-col>
      </el-row>

      <el-form @submit.native="handelSubmit" :rules="rules" ref="form" :model="form" label-width="70px">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="account" label="账户：" required>
              <el-input v-model="form.account" size="small" style="width:100%;" placeholder="请输入用户账户"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item prop="pwd" label="密码：" required>
              <el-input v-model="form.pwd" type="password" size="small" style="width:100%;" placeholder="请输入登录密码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :push="14" :span="10">
            <el-button @click="handelSubmit" style="width:100%;" size="small" type="primary" icon="el-icon-check">用户登录</el-button>
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
import qs from "qs";

export default {
  name: "action_login",

  data() {
    return {
      form: {
        account: "",
        pwd: ""
      },
      rules: {
        account: [
          {
            required: true,
            message: "必须输入用户账户！",
            trigger: ["blur", "change"]
          }
        ],
        pwd: [
          {
            required: true,
            message: "必须输入密码！",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },

  methods: {
    handelSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
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
  align-items: center;
  justify-content: center;

  .title_bar {
    width: 100%;
    height: 80px;
    box-shadow: 0 4px 3px 0px rgba(0, 21, 41, 0.08);
    background: rgba(255, 255, 255, 0.2);
    position: absolute;
    top: 0;

    font-weight: 400;
    font-size: 30px;
    line-height: 80px;
    color: #fff;
    text-align: center;
  }

  .login_bar {
    color: #383838;
    padding: 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #404040;
    border-radius: 4px;
    flex-grow: 0;

    .el-row {
      margin-bottom: 0;
    }
  }
}
</style>
