'use strict';

let //imports
//flyd = require('flyd'),
//stream = flyd.stream,
m = require('mithril')//,

//fjs = require('functional.js'),
//R = require('ramda')
;

window.aug = require('../lib/aug');

function init(cfg) {
  return {
    cfg
  }
}

function view(state, cfg) {
  let layout = require('../layout/main')

  return layout(state, () =>
    m('div', [
      m('h1', 'hello')
    ]), cfg)
}

let component = {
  controller: init,
  view: view
}


module.exports = component;
