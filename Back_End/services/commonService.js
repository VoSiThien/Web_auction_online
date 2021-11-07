const pagingation = (list, page, limit) => {
    if (list) {
        list.sort((a, b) => a - b)
        if (page || limit) {
            let firstOrder = (parseInt(page) - 1) * parseInt(limit)
            let lastOrder = (parseInt(page) * parseInt(limit))
            const paginationlist = list.slice(firstOrder, lastOrder)

            return paginationlist
        }
    }
}

const caculateNumberOfPage = (list, page, limit) => {
    if (list) {
        list.sort((a, b) => a - b)
        if (page || limit) {
            let totalPage = Math.floor(list.length / parseInt(limit))
            if (list.length % parseInt(limit) !== 0) {
                totalPage = totalPage + 1
            }
            
            return totalPage
        }
    }
}

module.exports = {
    pagingation,
    caculateNumberOfPage
}