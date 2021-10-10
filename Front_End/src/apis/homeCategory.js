import axios from '../axios/index';
/**
 * @param  {object} data
 * @param {string} data.cateId category ID
 * @param {string} data.cateName category name
 */
const geHomepageCategory = () => {
  let query = `/unauthorized-api/home/list-cat-home`;
  return axios.get(query);
};
const categoryApi = {
    geHomepageCategory
};

export default categoryApi;
