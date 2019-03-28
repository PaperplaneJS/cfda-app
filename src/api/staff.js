import axios from 'axios';

async function SingleStaff(loginData) {
  return await axios.post('/login', {
    data: loginData
  });
}

export {
  Login
};