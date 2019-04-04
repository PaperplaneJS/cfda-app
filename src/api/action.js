import axios from 'axios';

async function login(loginData) {
  return await axios.post('/login', loginData);
}

async function auth() {
  return await axios.post('/auth');
}

export {
  login,
  auth
};