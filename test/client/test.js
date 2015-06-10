'use strict';

var expect = require('chai').expect;

describe('document', () => {
  it('should have a property `body`', () => {
    expect(document.body).to.not.be.undefined;
  })
})

let greet = require('../../src/components/greet');

describe('greet', () => {
  it('should', () => {
    expect(greet('n')).to.equal('hello, n')
  })
})
