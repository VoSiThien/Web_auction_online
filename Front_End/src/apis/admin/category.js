import axios from '../../axios/index';

const getListCategory = ({ page, limit }) => {
  return axios.post('/api/categories/list-parent', {
    page: page,
    limit: limit,
  });
};

const authApi = {
  getListCategory
};
export default authApi;
