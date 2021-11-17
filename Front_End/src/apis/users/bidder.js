import axios from '../../axios/index';

const bidProduct = ({ priceBid, prodId }) => {

  let query = `/api/bid/bid-product`;
  return axios.post(query, { priceBid, prodId });
};

const bidAddWatchList = ({ prodId }) => {

  let query = `/api/bidder/favorite-product/add`;
  return axios.post(query, { prodId });
};

const bidDeleteWatchList = ({ favId }) => {

  let query = `/api/bidder/favorite-product/delete/${favId}`;
  return axios.post(query);
};

const requestUpgrade = (data) => {
  return axios.post('/api/bidder/allowSell', {accIsUpgrade : 1});
};

const bidderApi = {
    bidProduct,
    bidAddWatchList,
    bidDeleteWatchList,
    requestUpgrade
};

export default bidderApi;
