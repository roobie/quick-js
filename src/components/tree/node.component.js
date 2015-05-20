var CTL
, m = require('mithril')
, R = require('ramda')
, K = require('../../lib/karn/lib')
;


const component = {
  view: function Node_view(ctl, args) {
    const node = args.node;
    const indent_level = args.indent_level || 0;
    const key = args.key || 0;

    return m('div', {
      key: key,
      class: "tree-node indent-" + indent_level
    }, [
      R.range(0, indent_level).map(function (_, i) {
        return m('span.node-indenter', {
          //key: , // will never change order, so...
          class: (indent_level -1) === i ? 'last' : ''
        });
      }),
      m('span', {
        class: (node.children() || []).length ?
          'has-children' : 'has-no-children'
      }, [
        m('span.node-value', {
          title: 'KEY: [' + key + ']'
        }, node.value()),

        K.provided(
          m.prop((node.children() || []).length),
          R.always(m('span.expander-btn.unselectable.pointer-cursor', {
            unselectable: 'on',
            onclick: function () {
              ctl.vm.expanded(!ctl.vm.expanded());
            }
          }, ctl.vm.expanded() ? '[-]' : '[+]')))
      ]),
      (ctl.vm.expanded() ? (node.children() || []) : []).map(function (child, i) {
        return m.component(component, {
          node: child,
          key: String(key) + ':' + String(i),
          expanded: args.expanded,
          indent_level: indent_level + 1
        })
      })
    ]);
  },
  controller: function Node_controller(args) {
      this.vm = {
        expanded: m.prop(!!args.expanded)
      };
  }
};

module.exports = component;
