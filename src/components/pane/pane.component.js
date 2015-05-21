
var m = require('mithril');

function PaneCtx(props) {
  this.vm = {
    content: m.prop(props.content)
  };
}

PaneCtx.prototype.format = function () {
  return this.vm.content().toUpperCase();
};

function PaneView(ctx) {
  return m('.pane', {
    style: { border: '1px solid silver' }
  }, [
    m('span', ctx.formatTitle ? ctx.formatTitle() : void 0),
    m('span', ctx.format()),

  ]);
}

function PaneWithTitleCtx(props) {
  PaneCtx.call(this, props);
  this.vm.title = m.prop(props.title);
}

PaneWithTitleCtx.prototype = Object.create(PaneCtx.prototype, {
  formatTitle: {
    value: function () {
      return this.vm.title();
    }
  }
});

module.exports = {
  base: {
      controller: PaneCtx,
      view: PaneView
  },
  extd: {

  }
};
