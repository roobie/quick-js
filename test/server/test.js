'use strict';
/*global describe, it */

import {expect} from 'chai';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      expect([1, 2, 3].indexOf(5)).to.equal(-1);
      expect([1, 2, 3].indexOf(0)).to.equal(-1);
      expect([1, 2, 3].indexOf(10)).to.equal(-1);
      expect([1, 2, 3].indexOf(120)).to.equal(-1);
    });

    it('should return the index if found', () => {
      expect([9].indexOf(9)).to.equal(0);
    });
  });
});
