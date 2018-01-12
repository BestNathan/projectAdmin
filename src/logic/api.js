const base = require('./base.js')

module.exports = class extends base {
    async __before() {
        let flag = await super.__before()
        if (!flag) {
            return false
        }
        //check if has page
        

    }
    ordersAction() {
        let page = this.post('page')
        if (!page) {
            return this.fail(1004, 'NO_PAGE')
        }
        this.ctx.state.page = page
    }
};
