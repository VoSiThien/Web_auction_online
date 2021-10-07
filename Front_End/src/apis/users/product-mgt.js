import axios from '../../axios/index';

const getAuctionProductList = ({page, limit}) => {
  return axios.post('/api/seller/getAuctionProductList',{page: page, limit: limit});
};

const sellerProductApi = {
  getAuctionProductList,
  };
  export default sellerProductApi;