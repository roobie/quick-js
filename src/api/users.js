'use strict';

import m from 'mithril';
import request from './request';
import { stream } from 'flyd';
import Either from '../lib/Either';
import fjs from 'functional.js';

const API_URL = 'https://api.github.com/users';

export default function UsersRepo(load) {
  this.list$ = stream(Either.right([]));

  if (load) {
    this.getList();
  }
}

const times = function (num) {
  return function (a) {
    return num * a;
  };
};

const getRandomOffset = fjs.compose(Math.floor, times(5000), Math.random);

UsersRepo.prototype.getList = function UsersRepo$getList() {
  let url = `${API_URL}?since=${getRandomOffset()}`;
  let fail = Math.random() < 0.2;
  if (fail) {
    url = 'https://api.github.com/users/';
  }

  const promise = m.request({
    method: 'GET',
    url
  });

  return request(promise, this.list$);
};
