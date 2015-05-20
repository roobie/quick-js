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
    })
  ])
};


module.exports = Tree_view;
