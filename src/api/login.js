import qs from 'qs';

async function Login(data) {
  if (data.usr_account === "13700000000") {
    if (data.usr_password === "qwe123") {
      return {
        success: true,
        data: {
          id: "1",
          area: "1",
          name: "顾小华",
          sex: 1,
          state: 1,
          job: "副局长"
        }
      }
    } else {
      return {
        success: false,
        message: "密码错误！"
      }
    }
  } else {
    return {
      success: false,
      message: "账号不存在！"
    }
  }
}

export {
  Login
};

export default Login;