import test from 'blue-tape';
import samaritan from '../source/samaritan';


test('Tests run', (assert) => {
  assert.pass('Tests run');
  assert.end();
});


test('Greet World', (assert) => new Promise((resolve) => {
  assert.equal(1, 1);

  setTimeout(() => {
    // do some async stuff
    resolve();
  }, 10);
}));


test('Should support object spread', (assert) => new Promise((resolve) => {
  const options = {x: 1, y: 2, z: 3};
  const {x, ...opts} = options;

  assert.equal(x, 1);
  assert.deepEqual(opts, {y: 2, z: 3});

  resolve();
}));

test('Should support object assign', (assert) => new Promise((resolve) => {
  const defaults = {x: 1, y: 2, z: 3};
  const options = Object.assign(defaults, {w: 0, x: 11});

  assert.deepEqual(options, {w: 0, x: 11, y: 2, z: 3});

  resolve();
}));

test('Should just work (tm)', assert => {
  assert.deepEqual({a: 2}, {a: 2});
  assert.end();
});
