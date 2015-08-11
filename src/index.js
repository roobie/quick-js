'use strict';

import m from 'mithril';
import env from '../env/current';

if (!env) {
  throw new Error('No environment specified. Please make sure to create the file /env/current.js');
}

//setup routes to start w/ the `#` symbol
m.route.mode = 'hash';
m.route(document.body, '/', {
  '/': require('./components/root'),
  '/test': require('./components/root')
});
