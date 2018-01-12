const { getOrders } = require('./getOrderService')

module.exports = class extends think.Service {
    getOrders(page) {
        return getOrders(page)
    }
};
