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

const accUpdateprofile = ({ email, fullName, birthday, phoneNumber }) => {
    return axios.post('/api/bidder/update-profile', {
        email,
        fullName,
        birthday,
        phoneNumber
    });
};

const profileApi = {
    getProfile,
    accNewPassword,
    accUpdateprofile
  };
  export default profileApi;