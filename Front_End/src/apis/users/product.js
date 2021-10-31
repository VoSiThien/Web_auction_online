import axios from '../../axios/index';

const getAuctionProductList = ({page, limit}) => {
  return axios.post('/api/seller/getAuctionProductList', {page,limit});
};

const postAuctionProduct = (data) => {
  return axios.post('/api/seller/postAuctionProduct', data);
};

const updateAuctionProduct = (data) => {
  return axios.post('/api/seller/updateAuctionProductDescription', data);
};

const deleteAuctionProduct = (data) => {
  return axios.post('/api/seller/deleteAuctionProductList', data);
};

const sellerProductApi = {
  getAuctionProductList,
  postAuctionProduct,
  updateAuctionProduct,
  deleteAuctionProduct,
};

export default sellerProductApi;