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

  let value = any
  if (any === null || any === void 0) {
    // return an optional
    any = {}
    fjs.each(function (ext) {
      any[ext] = (() => {
        return fjs[ext](this);
      }).bind(value)
    }, aexts.existentials)

    any.valueOf = () => value

    return any
  }

  let box = (Ctor, val) => new Ctor(val)

  let anyf = () => any;
  any = (({
    number: () => box(Number, any),
    string: () => box(String, any),
    boolean: () => box(Boolean, any)
  }[typeof any]) || anyf)()

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
      //return fjs[ext](aug(fn), any);
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
