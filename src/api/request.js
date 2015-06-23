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

  const unwrapSuccess = function (result) {
    return result.json().then(function (data) {
      if (isSuccess(result.status)) {
        return done(Either.right(data));
      }

      return done(Either.left(data));
    });
  };
  const unwrapFail = function (reason) {
    return done(Either.left(reason));
  };

  return promise.then(unwrapSuccess, unwrapFail);
};

module.exports = request;
