var VIEW
, m = require('mithril')
, _ = require('lodash')
;

const glassClass = 'modal-glass-overlay';

function modalConfig(elem, isInit, context) {
  // Register an onunload callback, so we can
  // remove the class from the `body` when
  // the modal is closed.
  context.onunload = function () {
    document.body.classList.remove(glassClass);
  };
}

module.exports = function Modal_view(ctl, args) {
  document.body.classList.add(glassClass);

  return m('div', [
    m('.glass', []),
    m('.modal', { config: modalConfig }, [
      m('.modal-header', [
        m('.modal-header-title', [
          (args.header || _.noop)()
        ]),
        m('.modal-header-buttons', [
          m('button.dismiss[type="button"]', {
            onclick: args.ondismiss || _.noop
          }, m.trust('&times;'))
        ])
      ]),
      m('.modal-content', [
        m('.modal-content-cell', [
          (args.content || _.noop)()
        ])
      ]),
      m('.modal-footer', [
        m('.left'),
        m('.right', [
          m('.row', [
            m('button.modal-positive[type="button"]', {
              onclick: args.onclose || _.noop
            }, m.trust('&#x2713;')),

            args.type === 'confirm' ?
              m('button.modal-negative[type="button"]', {
                onclick: args.ondismiss || _.noop
              }, m.trust('&#x2717;')) :
              ''
          ])
        ])
      ])
    ])
  ]);
};
