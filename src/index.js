'use strict';

if (typeof Function.prototype.bind !== 'function') {
  let bind = require('lodash/function/bind');
  let slice = require('lodash/array/slice');
  Function.prototype.bind = function _bind() {
    return bind.apply(null, [this].concat(slice(arguments)));
  };
}

var
hello = require('./components/greet')
;

// test
console.log(hello('kewl guy'));
