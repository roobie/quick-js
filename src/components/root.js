'use strict';

import { provided } from '../lib/predicates';

//const flyd = require('flyd');
//stream = flyd.stream,
const m = require('mithril');

const ItemsRepo = require('../api/items');

const Either = require('../lib/Either');

//fjs = require('functional.js'),
//R = require('ramda');

const init = function init(cfg) {
  const itemsRepo = new ItemsRepo(true);
  const state = {
    items: [],
    itemsRepo,
    expanded: !1,
    cfg
  };

  itemsRepo.list$.map(function (result) {
    Either.match(result, {
      right: (items) => {
        state.message = '';
        state.items = items;
      },
      left: (reason) => {
        state.message = `Could not fetch users. ${reason.message}`;
      }
    });
  });

  return state;
};

const view = function view(state, cfg) {
  document.title = 'Root';
  const layout = require('../layout/main');

  return layout(state, () =>
    m('div', [
      m('h1', 'hello'),
      provided(state.message, () => m('div', state.message)),
      m('div', [
        m('button[type=button]', {
          onclick: () => state.itemsRepo.getList()
        }, 'Reload')
      ]),
      m('div', state.items.map(function (it) {
        return m('pre', JSON.stringify(it, null, 2));
      }))
    ]), cfg);
};

let component = {
  controller: init,
  view: view
};


module.exports = component;
