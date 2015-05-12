var A
, assert = require('assert')
, StateMachine = require('../src/lib/state_machine/state_machine')
;

module.exports = function run() {
  var exampleConfig = {
    initial_state: 'green',

    // Possible transitions:
    // green -> yellow
    // yellow -> green
    // yellow -> red
    // green -> red
    transitions: {
      clear: {
        from: 'yellow',
        to: 'green'
      },
      warn: {
        from: ['green', 'red'],
        to: 'yellow'
      },
      // the name of the transition
      alert: {
        // the state[s] applicable to transition _from_
        // a `*` means "any state"
        from: '*',
        // the name of the state to which this transition goes to.
        to: 'red'
      }
    }
  };

  describe('StateMachine', function () {
    var fsm;

    describe('initial state', function () {
      beforeEach(function () {
        fsm = new StateMachine(exampleConfig);
      });

      it('should start in the green state', function () {
        assert(fsm.current_state === 'green');
      });
      it('should be able to go to the yellow state (warn)', function () {
        assert(fsm.can('warn'));
      });
      it('should trigger all event handlers on a transition', function (done) {
        var n = 0;
        var inc = function () {
          n++;
        };

        fsm.onwarn = inc;
        fsm.onyellow = inc;
        fsm.onexitgreen = inc;

        fsm.warn();

        assert(n === 3);
        done();
      });
    });
  });

  console.log('Success');
};

module.exports();
