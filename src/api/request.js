'use strict';

const m = require('mithril');
const Either = require('../lib/Either');

const request = function (promise, stream) {
  m.startComputation();

  const done = function (either) {
    stream(either);

    m.endComputation();
    return either;
  };

  const isSuccess = function (status) {
    return 200 <= status && status < 300;
  };

  const unwrapRight = function (result) {
    return result.json().then(function (data) {
      if (isSuccess(result.status)) {
        return done(Either.right(data));
      }

      return done(Either.left(data));
    });
  };
  const unwrapLeft = function (reason) {
    return done(Either.left(reason));
  };

  return promise.then(unwrapRight, unwrapLeft);
};

module.exports = request;
