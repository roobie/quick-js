'use strict';

if (typeof Function.prototype.bind !== 'function') {
  require('../temp/phantom').init();
}

var m = require('mithril')
;


//setup routes to start w/ the `#` symbol
m.route.mode = 'hash';
m.route(document.body, '/', {
  '/': require('./components/root'),
  '/test': require('./components/root')
})
