import axios from '../../axios/index';

const getProfile = () => {
  return axios.get('/api/bidder/profile');
};
const accNewPassword = ({ userId, newpassword, oldpassword }) => {
    return axios.post('/api/bidder/update-password', {
        accId: userId,
        newPassword: newpassword,
        oldPassword: oldpassword,
    });
};

const profileApi = {
    getProfile,
    accNewPassword
  };
  export default profileApi;