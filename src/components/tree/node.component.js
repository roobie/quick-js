var CTL
, m = require('mithril')
, R = require('ramda')
;


const component = {
  view: function Node_view(ctl, args) {
    const node = args.node;
    const indent_level = args.indent_level || 0;
    const key = args.key || 0;
    const get_display_value = args.get_display_value || R.identity;

    return m('div', {
      key: key,
      class: "tree-node indent-" + indent_level
    }, [
      R.range(0, indent_level).map(function (_, i) {
        return m('span.node-indenter', {
          //key: i, // will never change order, so...
          class: (indent_level -1) === i ? 'last' : ''
        });
      }),
      m('span', [
        m('span.node-value', {
          title: '[' + key + ']'
        }, get_display_value(node.value)),
        ((node.children || []).length ?
          m('span.expander-btn', {
            onclick: function () {
              ctl.vm.expanded(!ctl.vm.expanded());
            }
          }, ctl.vm.expanded() ? '[-]' : '[+]') : void 0)
      ]),
      (ctl.vm.expanded() ? (node.children || []) : []).map(function (child, i) {
        return m.component(component, {
          node: child,
          key: i,
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
