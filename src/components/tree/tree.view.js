var VIEW
, m = require('mithril')
, R = require('ramda')
, Node = require('./node.component')
;

function Tree_view(ctl, args) {
  return m('.tree-view', [
    m.component(Node, {
      node: args.data,
      expanded: true,
      get_display_value: args.get_display_value
    })
  ])
};

function node_view(ctl, node, indent_level, get_display_value) {

}

module.exports = Tree_view;
