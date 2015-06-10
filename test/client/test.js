'use strict';

var expect = require('chai').expect;

describe('phantomjs', () => {
  it('should have the Function.prototype.bind polyfill', () => {
    expect(greet.bind(null, 'n')()).to.equal('hello, n')
  })
})

describe('document', () => {
  it('should have a property `body`', () => {
    void expect(document.body).to.not.be.undefined;
  })
})

let greet = require('../../src/components/greet');

describe('greet', () => {
  it('should', () => {
    expect(greet('n')).to.equal('hello, n')
  })
})
