'use strict';

import { stream } from 'flyd';
import Either from '../lib/Either';
import request from './request';
import m from 'mithril';

import { API_ROOT } from '../../env/current';
const API_URL = `${API_ROOT}/items/list`;


export const ItemsRepo = function ItemsRepo(load) {
  this.list$ = stream(Either.right([]));

  if (load) {
    this.getList();
  }
};

ItemsRepo.prototype.getList = function () {
  const promise = m.request({
    method: 'GET',
    url: API_URL
  });

  return request(promise, this.list$);
};

module.exports = ItemsRepo;
