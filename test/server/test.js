'use strict';
var expect = require('chai').expect;

let fjs = require('functional.js');
let aug = require('../../src/lib/aug');
let Either = require('../../src/lib/Either');

describe('template', () => {
  it('should ', () => {
    expect(1).to.equal(1);
  });
});


describe('Either', () => {
  const successText = 'such success',
        failText = 'much error';

  let getThing = function (success) {
    let text = success ?
      successText : null;

    if (text) {
      return Either.right({information: text});
    }
    return Either.left(new Error(failText));
  };
  it('should call the right callback if supplied ', () => {
    let message = Either.match(getThing(true), {
      right: (result) => result.information
    });

    expect(message).to.equal(successText);
  });
  it('should call the left callback if supplied ', () => {
    let message = Either.match(getThing(), {
      left: (err) => err.message
    });

    expect(message).to.equal(failText);
  });
});



describe('aug->', () => {
  let a1 = aug([]);
  let a2 = aug([9, 2, 5, 4]);
  let a3 = aug();
  let a4 = aug([7]);
  let a5 = aug(['Adam', 'Anna', 'Björn', 'Beatrice']);

  let not = (a) => !a;
  let even = (item) => item % 2 === 0;
  let odd = aug(even).compose(not);
  let t = () => true;
  let f = aug(t).compose(not);

  describe('Array::reduce', () => {
    it('should work as usual', () => {
      let cat1 = [a2, a4].reduce((a, b) => a.concat(b));
      let cat2 = aug([a2, a4]).reduce((a, b) => a.concat(b));

      expect(cat1).to.deep.equal(a2.concat(a4));
      expect(cat2).to.deep.equal(a2.concat(a4));
      expect(cat1).to.deep.equal(cat2);
    });
  });

  describe('Array::first', () => {
    it('should give the first item', () => {
      expect(a2.first(odd)).to.equal(a2[0]);
    });
  });

  describe('Array::rest', () => {
    it('should give the rest', () => {
      expect(a2.rest(t)).to.deep.equal(a2.slice(1));
    });
  });

  describe('Array::every', () => {
    it('should give true if all are true', () => {
      expect(a2.every(t)).to.equal(true);
      expect(a2.every(f)).to.equal(false);
    });
  });

  describe('Array::any', () => {
    it('should give true if all are true', () => {
      expect(a2.any(t)).to.equal(true);
      expect(a2.any(f)).to.equal(false);
      expect(a2.any(odd)).to.equal(true);
    });
  });

  describe('Array::pluck', () => {
    it('should give the values of the supplied property', () => {
      expect(a5.pluck('length')).to.deep.equal(a5.map((s) => s.length));
    });
  });

  describe('Array::best', () => {
    it('should give the value that scores the most', () => {
      expect(a5.best((a, b) => a.length > b.length).valueOf())
        .to.equal(a5.sort((a, b) => a.length < b.length).first(t));
    });
  });

  describe('Array::partition', () => {
    it(`should work by partitioning the collection into
    ones that pass the test, and those that don't`, () => {
      let parts = a2.partition(even);
      expect(parts).to.deep.equal([
        a2.filter(even),
        a2.filter(odd)
      ]);
    });
  });

  describe('Array::group', () => {
    it(`should work by grouping elements by the value from
    the iterator`, () => {
      let iter = (item) => item.charAt(0);
      let grp = a5.group(iter);
      expect(grp).to.deep.equal({
        'A': a5.filter((s) => s.charAt(0) === 'A'),
        'B': a5.filter((s) => s.charAt(0) === 'B')
      });
      expect(grp).to.deep.equal(fjs.group(iter, a5.valueOf()));
    });
  });

  describe('existentials', () => {
    it('should report true', () => {
      expect(a1.exists()).to.equal(true);
      expect(a1.truthy()).to.equal(true);

      expect(a2.exists()).to.equal(true);
      expect(a2.truthy()).to.equal(true);

      expect(a3.falsy()).to.equal(true);
    });

    it('should report false', () => {
      expect(a1.falsy()).to.equal(false);
      expect(a2.falsy()).to.equal(false);

      expect(a3.exists()).to.equal(false);
      expect(a3.truthy()).to.equal(false);
    });
  });
});
