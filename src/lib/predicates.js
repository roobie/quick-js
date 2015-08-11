'use strict';

/**
 * Returns the value of invoking fn if p (or optionally p()) is truthy.
 * Otherwise undefined.
 */
const provided = function (p, fn) {
  if (typeof p === 'function') {
    p = p();
  }

  if (p) {
    return fn();
  }
};

module.exports = {
  provided
};
