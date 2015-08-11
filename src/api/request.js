'use strict';

import Either from '../lib/Either';

export default function request(promise, stream) {

  const done = function (either) {
    stream(either);
    return either;
  };

  const unwrapSuccess = function (data) {
    return done(Either.right(data.results));
  };
  const unwrapFail = function (reason) {
    return done(Either.left(reason));
  };

  return promise.then(unwrapSuccess, unwrapFail);
}
