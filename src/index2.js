'use strict';

var INDEX
, hg = require('mercury')
, h = require('mercury').h

, flyd = require('flyd')
, stream = flyd.stream
, filter = require('flyd-filter')
, lift = require('flyd-lift')
, inLast = require('flyd-inlast')
, sampleOn = require('flyd-sampleon')
;

var magicSeq = 'abbaba';
var seqLen = magicSeq.length;
var maxTime = 5000;

var set = function(what, state) {
  /// @usage:
  ///```
  ///  var setter = set.bind(state, 'count');
  ///  flyd.map(setter(), countStream);
  ///  // or
  ///  flyd.map(set.call(state, 'count'), countStream);
  ///  // or
  ///  flyd.map(set('count', state), countStream);
  ///```
  return (state || this)[what].set;
};

function App() {
  var state = hg.state({
    count: hg.value(''),
    msg: hg.value(''),
    key: hg.value({}),

    streams: {
      clicks: stream(),
      keypresses: stream()
    }
  });

  flyd.map(set('key', state), state.streams.keypresses);

  var clicks = state.streams.clicks;

  var correctClicks = flyd.reduce(function(n, c) {
    return magicSeq[n] === c ? n + 1
         : magicSeq[0] === c ? 1
                             : 0;
  }, 0, clicks);

  flyd.map(set('count', state), correctClicks);

  var clicksInLast5s = inLast(maxTime, clicks);

  lift(function(corrects, inLast5s) {
    var
    complete = corrects === seqLen,
    inTime = inLast5s.length >= seqLen,
    msg = complete && inTime  ? 'Combination unlocked' :
          complete && !inTime ? "You're not fast enough, try again!" : '';

    set('msg', state)(msg);
  }, correctClicks, sampleOn(clicks, clicksInLast5s));

  flyd.map(function(c) { console.log('cor', c); }, correctClicks);
  flyd.map(function(c) { console.log('lst', c); }, clicksInLast5s);

  return state;
}


App.render = function render(state) {
  return h('div.container', {
    onkeyup: function (e) {
      state.streams.clicks(String.fromCharCode(e.which).toLowerCase());
    }
  }, [
    h('div', [
      h('pre', JSON.stringify(state.key || 0, null, 2))
    ]),
    h('div', [
      h('span', (state.count || 0).toString())
    ]),
    h('div', [
      h('span', (state.msg || '').toString())
    ]),
    h('div', [
      h('button#A[type=button]', {
        onclick: state.streams.clicks.bind(null, 'a')
      }, 'A'),
      h('button#B[type=button]', {
        onclick: state.streams.clicks.bind(null, 'b')
      }, 'B')
    ])
  ]);
};

hg.app(document.body, App(), App.render);
