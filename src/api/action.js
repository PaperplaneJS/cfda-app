import axios from 'axios';

const login = async (loginData) => {
  return await axios.post('/login', loginData);
}

const auth = async () => {
  return await axios.post('/auth');
}

export {
  login,
  auth
};