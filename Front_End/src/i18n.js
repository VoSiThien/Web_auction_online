import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const vnTranslation = {
  title: 'Family Store - Mua sắm online dễ dàng hơn',
  homepage: {
    bannerTitle: 'Mua sắm ngay tại nhà',
    bannerDescription:
      'Vì sức khỏe cộng đồng "Kết nối không khoảng cách". An tâm mua sắm tại nhà cùng Family Store',
    topTitle1: 'Bán chạy nhất tuần',
    topTitle2: 'Bán chạy nhất tháng',
    topTitle3: 'Sản phẩm giá tốt',
  },
  loginpage: {
    title: 'Family Store - Đăng Nhập',
    formTitle: 'Đăng Nhập',
    email: 'Email',
    emailInValid: 'Địa chỉ email không hợp lệ',
    password: 'Mật khẩu',
    passwordInValid: 'Mật khẩu không hợp lệ',
    buttonLogin: 'Đăng nhập',
    newMember: 'Chưa có tài khoản?',
    forgotPassword: 'Quên mật khẩu?',
    signUp: 'Đăng kí',
    buttonLoginPending: 'Đang đăng nhập...',
  },
  registerpage: {
    title: 'Family Store - Đăng Ký',
    formTitle: 'Đăng Ký',
    email: 'Email',
    emailInValid: 'Địa chỉ email không hợp lệ',
    address: 'Địa chỉ',
    fullName: 'Tên đầy đủ',
    fullNameInValid: 'Tên người dùng không hợp lệ.',
    addressInValid: 'Địa chỉ không hợp lệ.',
    password: 'Mật khẩu',
    passwordInValid: 'Mật khẩu không hợp lệ',
    confirmPassword: 'Nhập lại mật khẩu',
    confirmPasswordInValid: 'Mật khẩu và xác nhận mật khẩu không trùng nhau',
    phonenumberInValid: 'Số điện thoại không hợp lệ',
    buttonRegister: 'Đăng ký',
    buttonRegisterPending: 'Đang đăng ký...',
    haveAccount: 'Bạn đã có tài khoản ?',
    signIn: 'Đăng nhập',
  },
  searchpage: {
    title: 'Family Store - Tìm kiếm',
    topContent: 'Kết quả tìm kiếm cho',
    sortBy: 'Theo giá',
    sortType: 'Theo loại',
    optionPrice: 'Giá',
    optionAscending: 'Tốt',
    optionHigher: 'Từ cao',
    optionLower: 'Từ thấp',
  },
  forgotpasswordpage: {
    title: 'Family Store - Quên mật khẩu',
    formTitle: 'Quên mật khẩu',
    email: 'Email',
    emailInValid: 'Địa chỉ email không hợp lệ',
    buttonExecute: 'Nhận Email khôi phục',
    newMember: 'Chưa có tài khoản?',
    haveAccount: 'Quay lại trang đăng nhập',
    signUp: 'Đăng kí',
    pleaseCheckEmail:
      'Vui lòng kiểm tra email để reset password!. Chuyển sang trang đổi mật khẩu sau: ',
  },
  recoverypasswordpage: {
    title: 'Family Store - Khôi phục tài khoản',
    formTitle: 'Khôi phục tài khoản',
    password: 'Mật khẩu',
    passwordInValid: 'Mật khẩu không hợp lệ',
    confirmPassword: 'Nhập lại mật khẩu',
    confirmPasswordInValid: 'Mật khẩu và xác nhận mật khẩu không trùng nhau',
    buttonExecute: 'Xác nhận',
    resetPasswordSucceed: 'Đổi mật thành công! Chuyển sang trang đăng nhập sau:',
    checkEmail: 'Lấy code từ email',
  },
  accountactivationpage: {
    title: 'Family Store - Kích hoạt tài khoản',
    formTitle: 'Kích hoạt tài khoản',
    code: 'Mã kích hoạt',
    codeInvalid: 'Mã không hợp lệ',
    buttonExecute: 'Kích hoạt',
    haveAccount: 'Quay lại trang đăng nhập',
  },
  profilepage: {
    title: 'Tài khoản của tôi',
    tabTitle: {
      1: 'CƠ BẢN',
      2: 'ĐỔI MẬT KHẨU',
      3: 'ẢNH ĐẠI DIỆN',
    },
    fullName: 'Tên đầy đủ',
    email: 'Email',
    address: 'Địa chỉ',
    currentPassword: 'Mật khẩu hiện tại của bạn',
    newPassword: 'Mật khẩu mới',
    confirmNewPassword: 'Nhập lại mật khẩu mới',
    buttonRemove: 'Xóa',
    buttonBrowse: 'Chọn',
    buttonExecute: 'Lưu thay đổi',
  },
  productDetailPage: {
    productDescription: 'THÔNG TIN SẢN PHẨM',
    productReview: 'NHẬN XÉT SẢN PHẨM',
    suggestions: 'SẢN PHẨM GỢI Ý',
    showLess: 'Thu gọn',
    showMore: 'Đầy đủ',
    estimatedDeliveryFee: 'Phí giao hàng dự kiến:',
    districtOrWard: 'Quận / Huyện:',
    addToCart: 'Thêm vào giỏ hàng',
  },
  searchPlaceHolder: 'Tìm kiếm sản phẩm...',
  cartModal: {
    cart: 'Giỏ hàng',
    total: 'Tổng tiền',
    checkout: 'TIẾN HÀNH THANH TOÁN',
  },
  sideBar: {
    categories: 'Danh mục sản phẩm',
  },
  back: 'Quay lại',
  sellerProfile:{
    expUpgrade: "Ngày hết hạn seller:",
    likeSeller: "Số lượt Thích:",
    dislikeSeller: "Số lượt Không Thích:",
  },
};
const enTranslation = {
  title: 'Family Store - Easy to buy online',
  homepage: {
    bannerTitle: 'Stay home & delivered your daily need’s',
    bannerDescription: 'Start your daily shopping with Family Store',
    topTitle1: 'Top items selling last week',
    topTitle2: 'Top items selling last month',
    topTitle3: 'Items on sale',
  },
  loginpage: {
    title: 'Family Store - Login',
    formTitle: 'Login',
    email: 'Email',
    emailInValid: 'Please enter a valid email.',
    password: 'Password',
    passwordInValid: 'Please enter a valid password.',
    buttonLogin: 'Sign in',
    buttonLoginPending: 'Signing in...',
    newMember: 'New member?',
    forgotPassword: 'Forgot passsword?',
    signUp: 'Sign up',
  },
  registerpage: {
    title: 'Family Store - Sign up',
    formTitle: 'Sign up',
    email: 'Email',
    emailInValid: 'Please enter a valid email',
    address: 'Address',
    addressInValid: 'Please enter a valid address',
    fullName: 'FullName',
    fullNameInValid: 'Please enter a valid name',
    password: 'Password',
    passwordInValid: 'Please enter a valid password',
    confirmPassword: 'Confirm Password',
    confirmPasswordInValid: 'Password and confirm password does not match',
    phonenumberInValid: 'Please enter a valid phone number',
    buttonRegister: 'Sign up',
    buttonRegisterPending: 'Signing up...',
    haveAccount: 'Already have account ?',
    signIn: 'Login',
  },
  forgotpasswordpage: {
    title: 'Family Store - Forgot password',
    formTitle: 'Forgot password',
    email: 'Email',
    emailInValid: 'Please enter a valid email',
    buttonExecute: 'Receive recovery email',
    newMember: 'New member?',
    haveAccount: 'Back to login',
    signUp: 'Sign up',
    pleaseCheckEmail: 'Email has been sent!. Forward to  reset password page after: ',
  },
  recoverypasswordpage: {
    title: 'Family Store - Restore account',
    formTitle: 'Restore account',
    password: 'New password',
    passwordInValid: 'Please enter a valid password',
    confirmPassword: 'Retype new password',
    confirmPasswordInValid: 'Password and confirm password does not match',
    buttonExecute: 'Confirm',
    resetPasswordSucceed: 'Reset password successfully! Forward to login page after',
    checkEmail: 'Enter code from email',
  },
  accountactivationpage: {
    title: 'Family Store - Account activation',
    formTitle: 'Account activation',
    code: 'Activation code',
    codeInvalid: 'Code is invalid',
    buttonExecute: 'Active',
    haveAccount: 'Back to login',
  },
  searchpage: {
    title: 'Family Store - Search',
    topContent: 'Search results for',
    sortBy: 'Sort by',
    sortType: 'Sort type',
    optionPrice: 'Price',
    optionAscending: 'Ascending',
    optionHigher: 'Higher',
    optionLower: 'Lower',
  },
  profilepage: {
    title: 'My account',
    tabTitle: {
      1: 'BASIC PROFILE',
      2: 'CHANGE PASSWORD',
      3: 'AVATAR',
    },
    fullName: 'Full name',
    email: 'Email',
    address: 'Address',
    currentPassword: 'Your current password',
    newPassword: 'New password',
    confirmNewPassword: 'Retype your new password',
    buttonRemove: 'Remove',
    buttonBrowse: 'Browse',
    buttonExecute: 'Save changes',
  },
  productDetailPage: {
    productDescription: 'PRODUCT DESCRIPTION',
    productReview: 'PRODUCT REVIEW',
    suggestions: 'SUGGESTIONS',
    showLess: 'Show Less',
    showMore: 'Show More',
    estimatedDeliveryFee: 'Estimated delivery fee:',
    districtOrWard: 'District / Ward:',
    addToCart: 'ADD TO CART',
  },

  searchPlaceHolder: 'What are you looking for?',
  cartModal: {
    cart: 'Cart',
    total: 'Total Amount',
    checkout: 'PROCESS TO CHECKOUT',
  },
  sideBar: {
    categories: 'All Categories',
  },
  back: 'Back',

  sellerProfile:{
    expUpgrade: "Expired Seller:",
    likeSeller: "Num of Like:",
    dislikeSeller: "Num of Dislike:"
  },
};

const resources = {
  en: {
    translation: enTranslation,
  },
  vn: {
    translation: vnTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
