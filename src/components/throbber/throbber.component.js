var COMPONENT
, m = require('mithril')
;

require('./throbber.less');

const series = ['|', '/', '-', '\\'];

function throbberConfig(elem, isInited, context) {
  if (!isInited) {
    context.step = 0;
    context.intervalId = setInterval(function () {
      if (context.step >= series.length) {
        context.step = 0;
      }
      elem.innerHTML = series[context.step];
      context.step = context.step + 1;
    }, 150);
  }

  context.onunload = function () {
    clearInterval(context.intervalId);
  }
}

module.exports = {
  controller: function () { },

  view: function Throbber_view(ctl, args) {

    return m('span.throbber', {
        config: throbberConfig
      }, '/');
  }
};
