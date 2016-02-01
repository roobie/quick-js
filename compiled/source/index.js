'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function hello(name) {
  var format = function format() {
    return 'Hello, ' + (name || 'Anonymous') + '!';
  };

  return '1' + format();
}

exports.default = hello;