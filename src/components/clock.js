'use strict';

const flyd = require('flyd');
const stream = flyd.stream;
const m = require('mithril');

const Either = require('../lib/Either');

const every = function(dur) {
  var s = flyd.stream();
  var target = Date.now();
  function timer() {
    if (s.end()) {
      return;
    }
    var now = Date.now();
    target += dur;
    s(now);
    setTimeout(timer, target - now);
  }
  timer();
  return s;
};

const init = function () {
  const state = {};

  var everySecond = every(1000);
  flyd.map(function(time) {
    m.startComputation();
    state.time = time;
    m.endComputation();
  }, everySecond);
  return state;
};

const view = function (state) {
  let layout = require('../layout/main');
  const deg = 360 - 6 * new Date(state.time).getSeconds();
  const rot = 'rotate(' + deg + 'deg)';

  return layout(state, () => m('div.clock', [
    m('span', new Date(state.time).toLocaleString()),
    m('div.face', [
      m('div', {
        style: {
          width: '100px',
          height: '2px',
          color: '#333',
          'background-color': '#333',
          transform: rot
        }
      }, '')
    ])
  ]));
};

module.exports = {
  controller: init,
  view: view
};
