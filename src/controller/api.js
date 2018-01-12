const Base = require('./base.js');

module.exports = class extends Base {
  async ordersAction() {
      let data = await this.service('api').getOrders(this.ctx.state.page)
      if (data) {
          this.success(data, 'success')
      } else {
          this.fail(1001, 'FAIL_GET_ORDERS')
      }
  }
};
