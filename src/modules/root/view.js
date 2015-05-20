var VIEW
, m = require('mithril')
, R = require('ramda')
, K = require('../../lib/karn/lib')
, ProgressBar = require('../../components/progress_bar/progress_bar.component')
, Modal = require('../../components/modal/modal.component')
, Throbber = require('../../components/throbber/throbber.component')
, Tree = require('../../components/tree/tree.component')
, NodeModel = require('../../models/node')
;

function toNumber(argument) {
  return Number.parseFloat(argument);
}

var vm = {
  showModal: m.prop(false)
};

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
        oninput: m.withAttr('value', R.compose(ctl.percent, toNumber)),
        value: ctl.percent()
      }),
      m.component(ProgressBar, { percent: ctl.percent(), decimalCount: 2 }),
    ]),
    m('.test3', [
      m.component(Throbber, {})
    ]),
    m('.test4', [
      m.component(Tree, {
        data: new NodeModel({
          value: 'Root',
          children: [
            {
              value: 'Node 1', children: [
                { value: 'Node 1.1' },
                {
                  value: 'Node 1.2', children: [
                    { value: 'Node 1.2.1' },
                    { value: 'Node 1.2.2' },
                    { value: 'Node 1.2.3' },
                    { value: 'Node 1.2.4' },
                  ]
                },
              ]
            },
            {
              value: 'Node 2',
              children: [
                { value: 'Node 2.1' },
                { value: 'Node 2.2', children: [{ value: 'Node 2.2.1' }] },
              ]
            },
          ]
        })
      })
    ]),
    K.provided(
      vm.showModal,
      function () {
        return m.component(Modal, {
          title: m.prop('Test'),
          ondismiss: vm.showModal.bind(null, false),
          content: m.prop(m('span', 'test j owewoeif jwofjiwoe ifjweofj woefji woifjwoijwoefijw ofijwefoijw gfoijowijowiejf woekfjwldkogwreijg wkefjwo efijwoeifj woek fjweokfjsldkfj eiwf oweifj lkdsjf owiefj owekfj sdlf')),
          type: Math.random() < 0.5 ? 'confirm' : 'alert'
        });
      })
  ]);
};
