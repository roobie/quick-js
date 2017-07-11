const html = require('raw!./body.html');
require('!style!css!less!./styles.less');

import Event from 'geval';
import samaritan from './samaritan';
import every from './every';
import vanish from './effect.vanish';
import timeout from './timeout';
import fulfiller from './fulfiller';

function hello(name) {
  const format = () => `Hello, ${name || 'Anonymous'}!`;

  return '' + format();
}


function init() {
  const qs = document.querySelector.bind(document);

  qs('body').innerHTML = html;

  const outputEl = qs('#data-out');
  //vanish({element: outputEl});

  const stream = samaritan(Event(broadcast => {
    const dispose = fulfiller();
    const ticker = every(200, dispose.promise);
    const message = `In a night, or in a day,
In a vision, or in none,
Is it therefore the less gone?
All that we see or seem
Is but a dream within a dream.`;

    let track = [];
    const release = ticker(() => {
      const next = message[track.length];
      track.push(next);
      if (next === void 0) {
        dispose();
        release();
        timeout(9000)
          .then(() => vanish({
            element: outputEl,
            duration: 9999
          }))
          .then(() => outputEl.innerHTML = '');
      } else {
        broadcast(next.toUpperCase());
      }
    });
    const inputEl = qs('#data-in');
    inputEl.addEventListener('keypress', event => {
      if (event.which === 13) {
        inputEl.value = '';
        outputEl.innerHTML = '';
      } else {
        const tgtChar = String.fromCharCode(event.charCode);
        broadcast(tgtChar.toUpperCase());
      }
    });
  }));

  stream(chStream => {
    const charEl = document.createElement('span');
    outputEl.appendChild(charEl);

    const release = chStream(val => {
      if (['\n'].includes(val.target)) {
        charEl.textContent = ' ';
        charEl.appendChild(document.createElement('br'));
      }
      else {
        charEl.textContent = val.char;
      }

      if (val.done) {
        release();
      }
    });
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', init);
}


export default hello;
