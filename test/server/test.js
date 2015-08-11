'use strict';
var expect = require('chai').expect;

let Either = require('../../src/lib/Either');

// describe('template', () => {
//   it('should ', () => {
//     expect(1).to.equal(1);
//   });
// });


describe('Either', () => {
  const successText = 'such success';
  const failText = 'much error';

  const getThing = function (success) {
    const text = success ?
      successText : null;

    if (text) {
      return Either.right({information: text});
    }
    return Either.left(new Error(failText));
  };
  it('should call the right callback if supplied ', () => {
    const message = Either.match(getThing(true), {
      right: (result) => result.information
    });

    expect(message).to.equal(successText);
  });
  it('should call the left callback if supplied ', () => {
    const message = Either.match(getThing(), {
      left: (err) => err.message
    });

    expect(message).to.equal(failText);
  });
});
