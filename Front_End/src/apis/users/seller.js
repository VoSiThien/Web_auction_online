import axios from '../../axios/index';

const getProfile = () => {
  return axios.get('/api/seller/profile');
};

const sellerApi = {
    getProfile,
  };
  export default sellerApi;