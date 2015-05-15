var VIEW
, m = require('mithril')
, R = require('ramda')
;

const glass_class = 'modal-glass-overlay';

function modalConfig(elem, isInited, context, velem) {
  var onEsc = function (e) {
    if (e.which === 27) {
      m.startComputation();
      velem.attrs.dismiss();
      m.endComputation();
    }
  };

  if (!isInited) {
    document.body.classList.add(glass_class);
    window.addEventListener('keyup', onEsc);
  }

  // Register an onunload callback, so we can
  // remove the class from the `body` when
  // the modal is closed.
  context.onunload = function () {
    window.removeEventListener(onEsc);
    document.body.classList.remove(glass_class);
  };
}

module.exports = function Modal_view(ctl, args) {
  return m('div', {
      config: modalConfig,
      dismiss: args.ondismiss || R.F
    }, [
    m('.glass', []),
    m('.modal', [
      m('.modal-header', [
        m('.modal-header-title.col', [
          m('h2', [
            (args.title || R.F)()
          ])
        ]),
        m('.modal-header-buttons.col', [
          m('button.dismiss[type="button"]', {
            onclick: args.ondismiss || R.F
          }, m.trust('&times;'))
        ])
      ]),
      m('.modal-content', [
        m('.modal-content-space', [
          (args.content || R.F)()
        ])
      ]),
      m('.modal-footer', [
        m('.row', [
          m('.left', [
            m('button.modal-positive[type="button"]', {
            tabindex: 0,
            onclick: args.onclose || R.F
            }, m.trust('&#x2713;'))
          ]),
          m('.right', [
            (args.type === 'confirm' ?
              m('button.modal-negative[type="button"]', {
                onclick: args.ondismiss || R.F
              }, m.trust('&#x2717;')) :
              '')
          ])
        ])
      ])
    ])
  ]);
};
