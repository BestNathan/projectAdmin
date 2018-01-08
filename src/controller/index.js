const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    this.type = 'html'
    return this.display();
  }
};
