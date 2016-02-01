'use strict';

/*global describe, it */

import {expect} from 'chai';

import {hello} from '../../src/components/greet';

describe('phantomjs', () => {
  it('should have the Function.prototype.bind polyfill', () => {
    expect(hello.bind(null, 'n')()).to.equal('hello, n');
  });
});

describe('document', () => {
  it('should have a property `body`', () => {
    void expect(document.body).to.not.be.undefined;
  });
});

describe('greet', () => {
  it('should', () => {
    expect(hello('n')).to.equal('hello, n');
  });
});
