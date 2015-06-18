'use strict';
/**
* @module Either
* @example
let getThing = function (success) {
  let text = success ?
    'such success' : null;

  if (text) {
    return Either.right({information: text});
  }
  return Either.left(new Error('much error'));
}

let message = Either.match(getThing(true), {
  right: (result) => result.information,
  left: (err) => err.message
}); // message === 'such success'
*/
const Either = function Either() {};

module.exports = Either;

const Left = function left(value) {
  this.value = value;
};
const Right = function right(value) {
  this.value = value;
};
Either.match = (either, matcher, dynamicThis) => {
  return (matcher[either.constructor.name] || function () {})
    .call(dynamicThis, (either || {}).value);
};
Either.left = (value) => {
  return new Left(value);
};
Either.right = (value) => {
  return new Right(value);
};
