import axios from '../../axios/index';

const bidProduct = ({ priceBid, prodId }) => {

  let query = `/api/bid/bid-product`;
  return axios.post(query, { priceBid, prodId });
};

const bidAllow = ({ accIsUpgrade }) => {

  let query = `/api/bid/allowSell`;
  return axios.post(query, { accIsUpgrade });
};

const bidderApi = {
    bidProduct,
    bidAllow
};

export default bidderApi;
