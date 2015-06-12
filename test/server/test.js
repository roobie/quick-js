'use strict';
var expect = require('chai').expect;

let fjs = require('functional.js')
let aug = require('../../src/lib/aug')

describe('aug', () => {
  let a1 = aug([])
  let a2 = aug([9, 2, 5, 4])
  let a3 = aug();
  let a4 = aug([7])
  let a5 = aug(['Adam', 'Anna', 'Björn', 'Beatrice'])

  let not = (a) => !a
  let even = (item) => item % 2 === 0
  let odd = aug(even).compose(not)

  describe('::array->reduce', () => {
    it('should work as usual', () => {
      let cat1 = [a2, a4].reduce((a, b) => a.concat(b))
      let cat2 = aug([a2, a4]).reduce((a, b) => a.concat(b))

      expect(cat1).to.deep.equal(a2.concat(a4))
      expect(cat2).to.deep.equal(a2.concat(a4))
      expect(cat1).to.deep.equal(cat2)
    })
  })

  describe('::array->partition', () => {
    it(`should work by partitioning the collection into
    ones that pass the test, and those that don't`, () => {
      let parts = a2.partition(even)
      expect(parts).to.deep.equal([
        a2.filter(even),
        a2.filter(odd)
      ])
    })
  })

  describe('::array->group', () => {
    it(`should work by grouping elements by the value from
    the iterator`, () => {
      let iter = (item) => item.charAt(0)
      let grp = a5.group(iter)
      expect(grp).to.deep.equal({
        'A': a5.filter((s) => s.charAt(0) === 'A'),
        'B': a5.filter((s) => s.charAt(0) === 'B')
      })
      expect(grp).to.deep.equal(fjs.group(iter, a5.valueOf()))
    })
  })

  describe('::existentials', () => {
    it('should report true', () => {
      expect(a1.exists()).to.equal(true)
      expect(a1.truthy()).to.equal(true)

      expect(a2.exists()).to.equal(true)
      expect(a2.truthy()).to.equal(true)

      expect(a3.falsy()).to.equal(true)
    })

    it('should report false', () => {
      expect(a1.falsy()).to.equal(false)
      expect(a2.falsy()).to.equal(false)

      expect(a3.exists()).to.equal(false)
      expect(a3.truthy()).to.equal(false)
    })
  })
})
