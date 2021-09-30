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
                <h3>Xin chúc mừng bạn đã ra giá thành công</h3>
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

module.exports = {
    notifyBidSuccessToBidder,
    notifyBidSuccessToSeller,
    notifyBidSuccessToOldBidder,
    notifyCancelToBidder
}