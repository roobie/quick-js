'use strict';

const m = require('mithril');

const flyd = require('flyd');
const stream = flyd.stream;
const Either = require('../lib/Either');

require('whatwg-fetch');

const API_ROOT = 'http://localhost:5557';
const API_URL = `${API_ROOT}/item/list`;

const ItemsRepo = function ItemsRepo() {
  this.list$ = stream(Either.right([]));
};

ItemsRepo.prototype.getList = function () {
  const repo = this;
  m.startComputation();
  fetch(API_URL).then((result) => {
    result.json().then((data) => {
      repo.list$(Either.right(data));
    });
  }, (reason) => {
    repo.list$(Either.left(reason));
  }).then(m.endComputation, m.endComputation);
};

module.exports = ItemsRepo;
