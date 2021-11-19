import axios from '../../axios/index';

const getProfile = () => {
  return axios.get('/api/seller/profile');
};

const getBidderComment = ({ page, limit, bidderID }) => {
  return axios.post('/api/seller/get-bidder-comment', {page, limit, bidderID });
};


const sellerApi = {
    getProfile,
    getBidderComment
  };
  export default sellerApi;