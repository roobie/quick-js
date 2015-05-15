var VIEW
, m = require('mithril')
, R = require('ramda')
;

function node_view(node, indent_level, get_display_value) {
  return m('div', {
    key: indent_level + get_display_value(node.value),
    class: "tree-node indent-" + indent_level,
    style: {
      //'margin-left': String(indent_level * 5) + 'px'
    }
  }, [
    R.range(0, indent_level).map(function (_, i) {
      return m('span.node-indenter', {
        key: i,
        class: (indent_level -1) === i ? 'last' : ''
      });
    }),
    m('span', get_display_value(node.value)),
    (node.children || []).map(
      R.curry(node_view)(
        R.__, indent_level + 1, get_display_value))
  ]);
}

module.exports = function Tree_view(ctl, args) {
  return node_view(args.data, 0, args.get_display_value || R.identity);
};
