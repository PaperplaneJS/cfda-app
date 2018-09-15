<template>
  <div id="action_login">
    <div class="title_bar">
      <span class="title">常熟市食品生产经营监管信息化平台</span>
      <span></span>
    </div>

    <div class="login_bar">
      <el-row style="margin-bottom:30px;">
        <el-col :span="24">
          <span style="font-size:20px;">平台用户登录</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          账户：
          <el-input size="small" style="width:240px;" placeholder="请输入用户账户"></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          密码：
          <el-input type="password" size="small" style="width:240px;" placeholder="请输入登录密码"></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :push="16" :span="8">
          <el-button style="width:100%;" size="small" type="primary" icon="el-icon-check">用户登录</el-button>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: "action_login"
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

  .title_bar {
    width: 100%;
    height: 80px;
    box-shadow: 0 4px 3px 0px rgba(0, 21, 41, 0.08);
    background: rgba(255, 255, 255, 0.8);

    .title {
      margin-left: 30px;
      font-weight: 400;
      font-size: 30px;
      line-height: 80px;
      color: #383838;
    }
  }

  .login_bar {
    color: #383838;
    margin-left: 50px;
    margin-top: 50px;
    display: inline-block;
    padding: 15px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 4px;

    .el-row {
      margin-bottom: 10px;
    }

    .el-row:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
