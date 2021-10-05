import axios from '../axios/index';

const getProfile = () => {
  return axios.get('/api/auth/seller');
};

const sellerApi = {
    getProfile,
  };
  export default sellerApi;