var VIEW
, m = require('mithril')
, ProgressBar = require('../../components/progress_bar/progress_bar.component.js')
, Modal = require('../../components/modal/modal.component.js')
;

function compose(f, g) {
  return function (argument) {
    return g(f(argument))
  }
}

function toNumber(argument) {
  return Number.parseFloat(argument);
}

var vm = {
  showModal: m.prop(false)
}

module.exports = function (ctl) {
  return m('.root-page', [
    m('.test1', [
      m('button[type="button"]', {
        onclick: vm.showModal.bind(null, true)
      }, 'modal')
    ]),
    m('.test2', [
      m('input[type="range"]', {
        'min': 0,
        'step': 0.01,
        'max': 100,
        oninput: m.withAttr('value', compose(toNumber, ctl.percent)),
        value: ctl.percent()
      }),
      m.component(ProgressBar, { percent: ctl.percent, decimalCount: 2 }),
    ]),
    vm.showModal() ? m.component(Modal, {
      header: m.prop(m('h2', 'Test')),
      ondismiss: vm.showModal.bind(null, false),
      content: m.prop(m('span', 'test j owewoeif jwofjiwoe ifjweofj woefji woifjwoijwoefijw ofijwefoijw gfoijowijowiejf woekfjwldkogwreijg wkefjwo efijwoeifj woek fjweokfjsldkfj eiwf oweifj lkdsjf owiefj owekfj sdlf')),
      type: 'confirm'
    }) : void 0
  ]);
};
