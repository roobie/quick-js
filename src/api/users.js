'use strict';

const flyd = require('flyd');
const stream = flyd.stream;
const Either = require('../lib/Either');

require('es6-promise');
require('whatwg-fetch');

const request = require('./request');

const API_URL = 'https://api.github.com/users';


const UsersRepo = function UsersRepo(load) {
  this.list$ = stream(Either.right([]));

  if (load) {
    this.getList();
  }
};

UsersRepo.prototype.getList = function () {
  const randomOffset = Math.random() * 50000 | 0;
  let url = `${API_URL}?since=${randomOffset}`;
  let fail = true;
  if (fail) {
    url = 'https://api.github.com/users/';
  }

  const promise = fetch(url);

  return request(promise, this.list$);
};

module.exports = UsersRepo;
