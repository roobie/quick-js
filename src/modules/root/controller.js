'use strict';
var VIEW
, m = require('mithril')
, Pane = require('../../components/pane/pane.component')
;

function RootPageVm(props) {
  // Should be own file.
  this.currentValue = 54;
  this.maxValue = 442;
}

const vm = new RootPageVm();

module.exports = function () {

  // this.percent = function () {
  //   return !vm ? 0 : 100 * (vm.currentValue / vm.maxValue);
  // }

  this.percent = m.prop(0);

  this.pane = new Pane.base.controller({ content: 'Test' });
}
