'use strict';

const m = require('mithril');

const navNodes = [
  {title: 'Root', path: '/'},
  {title: 'Test', path: '/test'}
];

const handedness = [
  'left', 'right'
];

const header = function header(state) {
  return m('div', [
    m('nav', [
      m('div.float-container', handedness.map(function (side) {
        return m('button[type=button]', {
          class: 'pull-' + side,
          onclick: function () {
            state.expanded = !state.expanded;
          }
        }, 'm');
      })),
      m('ul.nav', {
        class: state.expanded ? '' : 'hide'
      }, navNodes.map(function (node) {
        return m('li.node', {
          class: node.path === m.route() ? 'active' : ''
        }, [
          m('a', {
            href: '#' + node.path,
            onclick: function () {
              return m.route(node.path);
            }
          }, [
            m('span', node.title)
          ])
        ]);
      }))
    ])
  ]);
};

const footer = function footer() {
  return m('div.footer', [
    m('hr'),
    m('span', m.trust('&copy; BR'))
  ]);
};

module.exports = function (state, getContents) {
  return m('div', [
    header(state),
    m('div', getContents()),
    footer(state)
  ]);
};
