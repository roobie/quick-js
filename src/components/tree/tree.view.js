var VIEW
, m = require('mithril')
, R = require('ramda')
;

function node_view(node, indent_level) {
  return m('div', {
    class: "tree-node indent-" + indent_level,
    style: {
      'margin-left': String(indent_level * 5) + 'px'
    }
  }, [
    m('span', node.value),
    (node.children || []).map(
      R.curry(node_view)(R.__, indent_level + 1))
  ]);
}

module.exports = function Tree_view(ctl, args) {
  return node_view(args.data, 0);
};
