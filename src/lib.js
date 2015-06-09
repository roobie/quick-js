var LIB
, flyd = require('flyd')
, every = require('flyd-every')
, stream = flyd.stream
, h = require('mercury').h
;

let flatMap = function(f, s) {
  return flyd.stream([s], function(own) {
    flyd.map(own, f(s()));
  });
};

let takeUntil = function(src, term) {
  return flyd.endsOn(flyd.merge(term, src.end), flyd.stream([src], function(self) {
    self(src());
  }));
};

let getRandomCharStream = (targetChar) => {
  let timer = every(50);
  let max = 20;
  let count = 0;
  let end = stream(); // timer.end
  let done = false;
  let result = takeUntil(flyd.stream([timer], function (rc$) {
    count++;
    if (Math.random() < 0.03 || count > max) {
      done = true;
      return rc$(targetChar);
    } else if (done) {
      end(true);
      return targetChar;
    }

    rc$(String.fromCharCode(33 + Math.random() * (126 - 33) | 0));
  }), end);

  return result;
};

module.exports = function samaritan(input$) {
  let result$ = stream([]);

  let char$s = flyd.scan(function (acc, char) {
    let rc$ = getRandomCharStream(char);
    return acc.concat({
      rc$: rc$,
      targetChar: char
    });
  }, [], input$);

  flyd.map(function (list) {
    result$(list);
  }, char$s);

  return result$;
};
