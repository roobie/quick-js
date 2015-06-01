var INDEX
, hg = require('mercury')
, h = require('mercury').h

, flyd = require('flyd')
, stream = flyd.stream
;

require('whatwg-fetch');

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

  });

  return state;
}

document.addEventListener('DOMContentLoaded2', function() {
  var suggestionsContainerElm = document.querySelector('.suggestions');
  var suggestionsElms = suggestionsContainerElm.children;

  function update(model, action) { // Take action & model, return updated model
    if (action.type === 'refresh') {
      return {loaded: [], suggested: []};
    } else if (action.type === 'loaded') {
      return {loaded: action.data, suggested: action.data.slice(0, 3)};
    } else if (action.type === 'remove') {
      return {
        loaded: model.loaded,
        suggested: model.suggested.map(function(sug, i) {
          return action.nr === i ? model.loaded[Math.floor(Math.random()*model.loaded.length)]
                                 : sug;
        })
      };
    }
  }

  function render(model) { // Take model, modify DOM
    if (model.suggested.length === 0) {
      suggestionsContainerElm.style.visibility = 'hidden';
    } else {
      suggestionsContainerElm.style.visibility = 'visible';
      model.suggested.forEach(function(user, i) {
        var suggestionElm = suggestionsElms[i];
        var usernameElm = suggestionElm.querySelector('.username');
        usernameElm.href = user.html_url;
        usernameElm.textContent = user.login;
        var imgEl = suggestionElm.querySelector('img');
        imgEl.src = '';
        imgEl.src = user.avatar_url;
      });
    }
  }

  var initialState = {
    loaded: [],
    suggested: [],
  };

  // Streams
  var action$ = flyd.stream();
  var model$ = flyd.scan(update, initialState, action$);
  flyd.map(render, model$);

  function makeRequest() {
    var randomOffset = Math.floor(Math.random()*500);
    return fetch('https://api.github.com/users?since=' + randomOffset)
      .then(function(res) { return res.json(); })
      .then(function(data) { action$({type: 'loaded', data: data}); });
  }
  makeRequest();
  function sendRemoveAction(idx) {
    action$({type: 'remove', nr: idx});
  }
  document.getElementById('refresh').addEventListener('click', makeRequest);
  document.getElementById('remove0').addEventListener('click', sendRemoveAction.bind(null, 0));
  document.getElementById('remove1').addEventListener('click', sendRemoveAction.bind(null, 1));
  document.getElementById('remove2').addEventListener('click', sendRemoveAction.bind(null, 2));
});


App.render = function (state) {
  return h('div', [
    h('.suggestions', state.suggested.map(function (sug, i) {
      return h('.suggestion', {key: i, class: 'no-' + i}, [
        h('.title', sug.title),
        h('button[type=button].remove', {
          onclick: () => state.streams.action$({type: 'remove', ord: i})
        }, '&times;')
      ])
    }))
  ])
};

hg.app(document.body, App(), App.render);
