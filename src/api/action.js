import axios from 'axios';

async function Login(loginData) {
  return await axios.post('/login', loginData);
}

async function Auth() {
  return await axios.post('/auth');
}

export {
  Login,
  Auth
};