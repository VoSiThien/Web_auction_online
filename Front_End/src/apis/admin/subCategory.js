import axios from '../../axios/index';

const getListSubCategory = ({ page, limit, catParent }) => {
  return axios.post('/api/categories/list-child', {
    page: page,
    limit: limit,
    catParent : catParent
  });
};

const authApi = {
    getListSubCategory
};
export default authApi;
