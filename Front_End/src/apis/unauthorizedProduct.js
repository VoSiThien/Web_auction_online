import axios from '../axios/index';
/**
 * @param  {object} data
 * @param {string} data.cateId category ID
 * @param {string} data.cateName category name
 */
const getProductDetail = (id) => {
  let query = `/unauthorized-api/product/details/${id}`;
  return axios.get(query);
};
const unauthorizedProduct = {
  getProductDetail
};

export default unauthorizedProduct;
