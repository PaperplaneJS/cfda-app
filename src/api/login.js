import axios from 'axios';
import qs from 'qs';

async function Login(data) {
  let res = await axios.post("/v1/login.json", qs.stringify(data));

  return res.data;
}

export {
  Login
};

export default Login;