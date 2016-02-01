import Event from 'geval';
import pattern from './non_printable_char_re';

const every = function (howMuch) {
  let intervalId = null;
  let counter = 0;
  const result = {
    stream: Event(broadcast => {
      intervalId = setInterval(
        () => broadcast(counter += howMuch),
        howMuch
      );
    }),
    destroy: () => clearInterval(intervalId)
  };

  return result;
};

const printableChars = new Array(0xff).join(' ').split(' ')
        .map(function (_, i) {
          return String.fromCharCode(i);
        })
        .filter(function (c) {
          return !pattern().test(c);
        });

function randomChar() {
  const randIdx = Math.floor(Math.random() * printableChars.length);
  return printableChars[randIdx];
}

function getRandomCharStream(targetChar) {
  const ticker = every(Math.random() * 200 | 0);
  const timer = ticker.stream;
  const max = 30;
  let count = 0;

  return Event(broadcast => {
    const hasRunOnce = () => count > 0;
    const atTarget = () => Math.random() < 0.02 || count > max;
    const release = timer(() => {
      count++;

      if (hasRunOnce() && atTarget()) {
        ticker.destroy();
        release();
        broadcast({
          done: true,
          char: targetChar
        });
      } else {
        broadcast({
          done: false,
          char: randomChar()
        });
      }
    });
  });
}

export default function samaritan(input) {
  return Event(broadcast => {
    input(char => {
      broadcast(getRandomCharStream(char));
    });
  });
}
