'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _blueTape = require('blue-tape');

var _blueTape2 = _interopRequireDefault(_blueTape);

var _index = require('../source/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

(0, _blueTape2.default)('Tests run', function (assert) {
  assert.pass('Tests run');
  assert.end();
});

(0, _blueTape2.default)('Greet World', function (assert) {
  return new Promise(function (resolve) {
    assert.equal((0, _index2.default)('World'), '1Hello, World!');

    setTimeout(function () {
      // do some async stuff
      resolve();
    }, 10);
  });
});

(0, _blueTape2.default)('Should support object spread', function (assert) {
  return new Promise(function (resolve) {
    var options = { x: 1, y: 2, z: 3 };
    var x = options.x;

    var opts = _objectWithoutProperties(options, ['x']);

    assert.equal(x, 1);
    assert.deepEqual(opts, { y: 2, z: 3 });

    resolve();
  });
});

(0, _blueTape2.default)('Should support object assign', function (assert) {
  return new Promise(function (resolve) {
    var defaults = { x: 1, y: 2, z: 3 };
    var options = _extends(defaults, { w: 0, x: 11 });

    assert.deepEqual(options, { w: 0, x: 11, y: 2, z: 3 });

    resolve();
  });
});

(0, _blueTape2.default)('Should just work (tm)', function (assert) {
  assert.deepEqual({ a: 2 }, { a: 2 });
  assert.end();
});