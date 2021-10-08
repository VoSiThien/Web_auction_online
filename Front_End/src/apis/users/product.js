import axios from '../../axios/index';

const getAuctionProductList = ({page, limit}) => {
  return axios.post('/api/seller/getAuctionProductList', {page,limit});
};

const postAuctionProduct = (data) => {
  return axios.post('/api/seller/postAuctionProduct', data);
};


const sellerProductApi = {
  getAuctionProductList,
  postAuctionProduct,
};

export default sellerProductApi;