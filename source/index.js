require('html!./index.html');

import Event from 'geval';
import samaritan from './samaritan';

function hello(name) {
  const format = () => `Hello, ${name || 'Anonymous'}!`;

  return '' + format();
}

function init() {
  const qs = document.querySelector.bind(document);

  const outputEl = qs('#data-out');

  const stream = samaritan(Event(broadcast => {
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
      charEl.textContent = val.char;
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
