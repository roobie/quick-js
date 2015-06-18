'use strict';

const flyd = require('flyd');
//stream = flyd.stream,
const m = require('mithril');

const ItemsRepo = require('../api/items');

const Either = require('../lib/Either');

//fjs = require('functional.js'),
//R = require('ramda');

window.aug = require('../lib/aug');

const init = function init(cfg) {
  const itemsRepo = new ItemsRepo();
  itemsRepo.getList();

  return {
    itemsRepo,
    expanded: !1,
    cfg
  };
};

const view = function view(state, cfg) {
  let layout = require('../layout/main');

  let items = [];
  flyd.map(function (list) {
    items = Either.match(list, {
      right: (a) => a
    });
  }, state.itemsRepo.list$);

  return layout(state, () =>
    m('div', [
      m('h1', 'hello'),
      m('div', items.map(function (it) {
        return m('h2', it.name);
      }))
    ]), cfg);
};

let component = {
  controller: init,
  view: view
};


module.exports = component;
