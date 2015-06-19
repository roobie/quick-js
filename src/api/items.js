'use strict';

const flyd = require('flyd');
const stream = flyd.stream;
const Either = require('../lib/Either');

require('whatwg-fetch');
require('es6-promise');

const API_ROOT = 'http://localhost:5557';
const API_URL = `${API_ROOT}/item/list`;

const request = require('./request');

const ItemsRepo = function ItemsRepo() {
  this.list$ = stream(Either.right([]));
};

ItemsRepo.prototype.getList = function () {
  const promise = fetch(API_URL);

  return request(promise, this.list$);
};

module.exports = ItemsRepo;
