module.exports = class extends think.Controller {
  __before() {
    this.fail(9999,'NOT_FOUND')
  }
};
