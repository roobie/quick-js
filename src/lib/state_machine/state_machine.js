var STATE_MACHINE
, _ = require('lodash')
;

const ANY_STATE = '*';

/// API spec.
///
function StateMachine(props) {
  this.init(props);
};

Object.defineProperties(StateMachine.prototype, {
  init: {
    value: function (props) {
      var fsm = this;

      this._cfg = props;
      var transitions = Object.keys(props.transitions);
      var states = _(props.transitions)
        .pluck('to')
        .uniq()
        .valueOf();
      this._state = props.initialState || states[0];

      _.forEach(props.transitions, function (t, n) {
        fsm[n] = function () {
          (fsm['on' + n] || _.noop).apply(arguments);
          (fsm['on' + t.to] || _.noop).apply(arguments);
          (fsm['onexit' + fsm.current_state] || _.noop).apply(arguments);
        }
      })

      // on[transition]
      // on[enter|leave][ing][state]
    }
  },

  current_state: {
    get: function () {
      return this._state;
    }
  },

  can: {
    value: function (transition) {
      var a = this._cfg.transitions[transition];
      if (!a) {
        throw Error();
      }

      return a.from === ANY_STATE ||
        (Array.isArray(a.from) ?
          a.from.indexOf(this.current_state) !== -1 :
          a.from === this.current_state)
    }
  }
});

module.exports = StateMachine;
