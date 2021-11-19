const environment = require('../environments/environment')


const notifyBidSuccessToBidder = (account, product, priceBid) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${account[0].acc_email}`,
        subject: 'Đấu giá thành công',
        html: ` <h1>Chào ${account[0].acc_full_name} thân mến! </h1>
                <h3>Xin chúc mừng bạn đã ra giá thành công</h3>
                <h3>Thông tin người bán: </h3>
                <h3>Tên: ${product[0].acc_full_name}</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                                <th scope="col" class="text-center">Giá của bạn đặt</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${product[0].prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_current}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${priceBid}</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const notifyBidSuccessToSeller = (account, product, priceBid) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${product[0].acc_email}`,
        subject: 'Đấu giá thành công',
        html: ` <h1>Chào ${product[0].acc_full_name} thân mến! </h1>
                <h3>Đã có người ra giá thành công cho sản phẩm của bạn, vui lòng xem chi tiết bên dưới</h3>
                <h3>Thông tin người ra giá: </h3>
                <h3>Tên: ${account[0].acc_full_name}</h3>
                <h3>Số điện thoại: ${account[0].acc_phone_number}</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                                <th scope="col" class="text-center">Giá mới nhất</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${product[0].prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_current}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${priceBid}</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const notifyBidSuccessToOldBidder = (account, product, accountHolder) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${accountHolder[0].acc_email}`,
        subject: 'Đấu giá đã bị rớt',
        html: ` <h1>Chào ${accountHolder[0].acc_full_name} thân mến! </h1>
                <h3>Đã có người ra giá cao hơn bạn, để sở hữu sản phẩm bạn vui lòng đấu giá mới.</h3>
                <h3><a href="http://localhost:4000/details/${product[0].prod_id}">Đi đến sản phẩm</a></h3>
                <h3>Thông tin người ra giá: </h3>
                <h3>Tên: ${account[0].acc_full_name}</h3>
                <h3>Số điện thoại: ${account[0].acc_phone_number}</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                                <th scope="col" class="text-center">Giá cũ của bạn</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${product[0].prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_current}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_highest}</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const notifyCancelToBidder = (account, product, hisPrice) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${account[0].acc_email}`,
        subject: 'Đấu giá đã bị từ chối',
        html: ` <h1>Chào ${account[0].acc_full_name} thân mến! </h1>
                <h3>Đấu giá của bạn đã bị từ chối, vui lòng kiểm tra lại thông</h3>
                <h3>Thông tin người bán: </h3>
                <h3>Tên: ${product[0].acc_full_name}</h3>
                <h3>Số điện thoại: ${product[0].acc_phone_number}</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                                <th scope="col" class="text-center">Giá của bạn ra</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${product[0].prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_current}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${hisPrice}</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const notifyCancelToBidderInheritance = (account, product, hisPrice) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${account[0].acc_email}`,
        subject: 'Bạn là người giữ giá',
        html: ` <h1>Chào ${account[0].acc_full_name} thân mến! </h1>
                <h3>Người giữ giá trước đó đã bị từ chối, bạn đã trở thành người giữ giá mới cho sản phẩm</h3>
                <h3>Thông tin người bán: </h3>
                <h3>Tên: ${product[0].acc_full_name}</h3>
                <h3>Số điện thoại: ${product[0].acc_phone_number}</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                                <th scope="col" class="text-center">Giá của bạn ra</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${product[0].prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${product[0].prod_price_current}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${hisPrice}</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const registerOptions = (to, cusName, token) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${to}`,
        subject: 'Xác nhận Email',
        html: ` <h1>Chào ${cusName} thân mến! </h1><br>
                <h3>Bạn đã sử dung email ${to} để đăng ký tài khoản trên Auction online, chào mừng bạn đến với trang website đấu giá của chúng tôi:</h3>
                <h3>Mã Xác minh: ${token}</h3><br>
                <h3>Lưu ý: Vui lòng không cung cấp mã này cho bất kì ai, mã xác minh chỉ được sử dụng 1 lần.</h3><br>
                <h3>Trân trọng cảm ơn quý khách!</h3>`
    }
    
}

const forgotPasswordOptions = (to, cusName, token) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${to}`,
        subject: 'Quên mật khẩu',
        html: ` <h1>Chào ${cusName} thân mến! </h1><br>
                <h3>Mã Xác minh quên mật khẩu: ${token}</h3><br>
                <h3>Lưu ý: Vui lòng không cung cấp mã này cho bất kì ai, mã xác minh chỉ được sử dụng 1 lần.</h3><br>
                <h3>Trân trọng!</h3>`
    }
}


// cron job
const notifyToBidderWhenProductEnd = (Infor) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${Infor.bidemail}`,
        subject: 'Bạn đã thắng đấu giá',
        html: ` <h1>Chào ${Infor.bidname} thân mến! </h1>
                <h3>Xin chúc mừng, bạn đã là người giữ giá cao nhất cho đến cuối cùng sản phẩm.</h3>
                <h3>Thông tin người bán: </h3>
                <h3>Tên: ${Infor.acc_full_name}</h3>
                <h3>Số điện thoại: ${Infor.acc_phone_number}</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                                <th scope="col" class="text-center">Giá của bạn</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${Infor.prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${Infor.prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${Infor.prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${Infor.prod_price_current}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${Infor.prod_price_highest}</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const notifyToSellerWhenProductEndNotBid = (infor) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${infor.acc_email}`,
        subject: 'Sản phẩm hết hạn',
        html: ` <h1>Chào ${infor.acc_full_name} thân mến! </h1>
                <h3>Rất tiếc sản phẩm bạn đã hết hạn, và không có ai quan tâm đến sản phẩm của bạn</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${infor.prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${infor.prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${infor.prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>0</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const notifyToSellerWhenProductEndExistsBid = (infor) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${infor.acc_email}`,
        subject: 'Sản phẩm kết thúc',
        html: ` <h1>Chào ${infor.acc_full_name} thân mến! </h1>
                <h3>Sản phẩm của bạn đã kết thúc, đã có người đặt giá cao nhất.</h3>
                <h3>Thông tin người ra giá: </h3>
                <h3>Tên: ${infor.bidname}</h3>
                <h3>Số điện thoại: ${infor.bidphone}</h3>
                <h3>Thông tin sản phẩm: </h3>
                <div id="infoList">
                    <table class="table table-hover" id="tableCategory">
                        <thead>
                            <tr style="background-color:bisque">
                                <th scope="col" class="text-center" style="width: 25%">Tên sản phầm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá khởi điểm</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá mua ngay</th>
                                <th scope="col" style="width: 15%;" class="text-center">Giá hiện tại</th>
                                <th scope="col" class="text-center">Giá cao nhất</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyCateParent">
                            <div id="">
                                <tr>
                                    <div style="size:100px;margin:1%;background-color:aliceblue">
                                        <td class="text-center">
                                            <label>${infor.prod_name}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${infor.prod_price_starting}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${infor.prod_price}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${infor.prod_price_current}</label>
                                        </td>
                                        <td class="text-center">
                                            <label>${infor.prod_price_highest}</label>
                                        </td>
                                    </div>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>`
    }
}

const notifyUpdateDesciptionToBidder = (account, product) => {
    return {
        from: {
            name: 'Auction online',
            email: `${environment.mailConfig.user}`
        },
        to: `${account.acc_email}`,
        subject: 'Thông tin sản phẩm thay đổi',
        html: ` <h1>Chào ${account.acc_full_name} thân mến! </h1>
                <h3>Sản phẩm bạn đang tham gia đấu giá được cập nhât.</h3>
                <h3>Thông tin thay đổi: </h3>
                <h3>Mô tả sản phẩm</h3>
                <p>${product[0].prod_description}</p>
                `
    }
}
module.exports = {
    notifyBidSuccessToBidder,
    notifyBidSuccessToSeller,
    notifyBidSuccessToOldBidder,
    notifyCancelToBidder,
    notifyCancelToBidderInheritance,
    registerOptions,
    forgotPasswordOptions,
    notifyToBidderWhenProductEnd,
    notifyToSellerWhenProductEndNotBid,
    notifyToSellerWhenProductEndExistsBid,
    notifyUpdateDesciptionToBidder
}