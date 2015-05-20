var NODE
, m = require('mithril')
;

function Node(props) {
  this.value = m.prop(props.value);
  this.children = m.prop(
    (props.children || []).length ?
      props.children.map(Node.create) :
      []);
}

Node.create = function (props) {
  return props.constructor === Node ? props : new Node(props);
};

module.exports = Node;
