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
          key: i,
          class: (indent_level -1) === i ? 'last' : ''
        });
      }),
      m('span', [
        ((node.children || []).length ?
          m('span.expander-btn', {
            onclick: function () {
              ctl.vm.expanded(!ctl.vm.expanded());
            }
          }, ctl.vm.expanded() ? '[-]' : '[+]') : void 0),
        m('span.node-value', get_display_value(node.value))
      ]),
      (ctl.vm.expanded() ? (node.children || []) : []).map(function (child) {
        return m.component(component, {
          node: child,
          key: key + 1,
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
