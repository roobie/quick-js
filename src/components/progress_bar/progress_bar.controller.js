var CONTROLLER
, m = require('mithril')
;

module.exports = function ProgressBar_controller(args) {
  this.percent = args.percent || m.prop(0);
};
