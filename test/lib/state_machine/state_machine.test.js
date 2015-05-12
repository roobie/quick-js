var A
, assert = require('assert')
, StateMachine = require('./state_machine')
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

  var fsm = new StateMachine(exampleConfig);
  describe('StateMachine', function () {
    describe('initial state', function () {
      it('should start in the green state', function () {
        assert(fsm.current_state === 'green');
        assert(fsm.can('warn'))
      });
    });
  });

  console.log('Success');
};

module.exports();
