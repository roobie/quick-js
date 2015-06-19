'use strict';

const flyd = require('flyd');
const stream = flyd.stream;
const Either = require('../lib/Either');
const fjs = require('functional.js');

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

const times = function (num) {
  return function (a) {
    return num * a;
  }
};

const getRandomOffset = fjs.compose(Math.floor, times(5000), Math.random);

UsersRepo.prototype.getList = function () {
  let url = `${API_URL}?since=${getRandomOffset()}`;
  let fail = Math.random() < 0.2;
  if (fail) {
    url = 'https://api.github.com/users/';
  }

  const promise = fetch(url);

  return request(promise, this.list$);
};

module.exports = UsersRepo;
