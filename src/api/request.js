'use strict';

const m = require('mithril');
const Either = require('../lib/Either');

const unwrap = function (stream, isSuccess) {
  return (result) => {
    return result.stack ?
      result.stack :
      result.json().then((data) => {
        const either = isSuccess ? Either.right : Either.left;

        stream(either(data));

        // mithril integration - at the very end
        m.endComputation();
        return data;
      });
  };
};

const request = function (promise, stream) {
  m.startComputation();

  const unwrapRight = unwrap(stream, true);
  const unwrapLeft = unwrap(stream);

  return promise.then(unwrapRight, unwrapLeft);
}

module.exports = request;
