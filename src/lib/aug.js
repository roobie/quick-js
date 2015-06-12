'use strict';
let fjs = require('functional.js')

module.exports = function aug(any) {
  let aexts = {
    array: [
      // Array
      'each',
      'map',
      'reduce',
      'fold',
      'apply',
      'every',
      'any',
      'select',
      'pluck',
      'toArray',
      'first',
      'rest',
      'last',
      'best',
      'partition',
      'group',
      'while',
      'nub'
    ],
    function: [
      // Functions
      'compose'
    ],
    object: [
      // Objects
      'clone',
      'assign',
      'prop',
      'isArray',
      'isFunction',
      'isString'
    ],
    existentials: [
      // Existentials
      // these are unary
      'exists',
      'truthy',
      'falsy'
    ]
  }

  if (any === null || any === void 0) {
    // return an optional
    let val = any
    any = {}
    fjs.each(function (ext) {
      any[ext] = (() => {
        return fjs[ext](this);
      }).bind(val)
    }, aexts.existentials)

    any.valueOf = () => val

    return any
  }

  let box = (Ctor, val) => new Ctor(val)

  let gany = () => any;
  any = (({
    number: () => box(Number, any),
    string: () => box(String, any),
    boolean: () => box(Boolean, any)
  }[typeof any]) || gany)()

  var exts = []
  if (fjs.isFunction(any)) {
    exts = aexts.function
  } else { // if (fjs.isArray(any) || fjs.isString(any)) {
    exts = fjs.reduce(function (a, b) {
      return a.concat(b)
    }, [
      aexts.array,
      aexts.object
    ])
  }

  // binary functions
  fjs.each(function (ext) {
    any[ext] = (fn) => {
      return fjs[ext](fn, any);
    }
  }, exts)

  // unary functions
  fjs.each(function (ext) {
    any[ext] = () => {
      return fjs[ext](any.valueOf());
    }
  }, aexts.existentials)

  return any
}
