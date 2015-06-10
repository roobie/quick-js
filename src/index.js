'use strict';

if (typeof Function.prototype.bind !== 'function') {
  require('../temp/phantom').init();
}

var
hello = require('./components/greet')
;

// test
console.log(hello('kewl guy'));
