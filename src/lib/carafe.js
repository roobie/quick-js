'use strict';

const NAME = 'C';

const C = {
  name: NAME
};



Object.defineProperties(C, {
  Either: {
    enumerable: true,
    value: require('./Either')
  }
});
