module.exports = class extends think.Service {
  setCorsHeaders(ctrl) {
    ctrl.header("Access-Control-Allow-Origin", ctrl.header("origin") || "*");
    ctrl.header("Access-Control-Allow-Headers", "content-type");
    ctrl.header("Access-Control-Request-Method", "GET,POST,OPTIONS,PUT,DELETE");
    ctrl.header("Access-Control-Allow-Credentials", "true");
  }
};
