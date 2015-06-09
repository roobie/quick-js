var INDEX
, samaritan = require('./lib')
, flyd = require('flyd')
, stream = flyd.stream
, hg = require('mercury')
, h = hg.h
;


require('./main.less');

let flatMap = function(f, s) {
  return flyd.stream([s], function(own) {
    flyd.map(own, f(s()));
  });
};

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

let withAttr = (attrName, stream) => {
  return (event) => stream(event.target[attrName]);
};
let sendVal = withAttr.bind(null, 'value');

function App() {
  // 1. Stream creation
  let append$ = stream();
  let input$ = stream('');
  let out$ = samaritan(append$);

  // 2. State initialisation
  let state = hg.state({
    inputText: hg.value(''),
    contents: hg.value(h('.initial')),

    streams: {
      textInput$: input$,
      charInput$: append$,
    }
  });
  let _set = set.bind(state);

  // 3. Stream I/O
  flyd.map(_set('inputText'), input$);

  let contents = [];
  flyd.map(function (list) {
    list.forEach(function (item, idx) {
      flyd.map(function (char) {
        if (char.val) {
          contents[idx] = h('span', item.targetChar);
        } else {
          contents[idx] = h('span', char);
        }
        _set('contents')(contents);
      }, item.rc$);
    });
  }, out$);

  return state;
}

App.render = function (state) {
  return h('.result', [
    h('.controls', [
      h('input[type=text]', {
        oninput: sendVal(state.streams.textInput$),
        onkeyup: (e) => {
          state.streams.charInput$(String.fromCharCode(e.which));
        },
        value: state.inputText
      })
    ]),
    h('.test', state.contents)
  ]);
};

hg.app(document.body, App(), App.render);
