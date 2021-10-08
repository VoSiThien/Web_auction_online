import axios from '../../axios/index';

const bidProduct = ({ priceBid, prodId }) => {

  let query = `/api/bid/bid-product`;
  return axios.post(query, { priceBid, prodId });
};

const bidderApi = {
    bidProduct
};

export default bidderApi;
