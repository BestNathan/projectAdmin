const Base = require('./base.js');

module.exports = class extends Base {

  async toutiaoAction() {
    await this.service('admin').adminControll(this.ctx)
  }
  async jiuzhouAction() {
    await this.service('admin').adminControll(this.ctx)
  }
};
