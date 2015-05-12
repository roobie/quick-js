var INDEX
, m = require('mithril')
, root = require('./modules/root/component')
;


m.route(document.body, '/', {
  '/': root
});
