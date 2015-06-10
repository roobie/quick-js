'use strict';

module.exports = {
  init: function () {
    let bind = require('lodash/function/bind');
    let slice = require('lodash/array/slice');
    Function.prototype.bind = function _bind() {
      return bind.apply(null, [this].concat(slice(arguments)));
    };
  }
};
