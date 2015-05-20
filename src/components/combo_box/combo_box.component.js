var COMP
, m = require('mithril')
, R = require('ramda')
, K = require('../../lib/karn/lib')
;

require('./combo_box.less');

const DEBUG = require('../../is_debug');

module.exports = {
  controller: function ComboBox_controller(args) {
    this.vm = {
      query: m.prop(args.query || ''),
      data: m.prop([])
    };
  },

  view: function ComboBox_view(ctl, args) {
    const should_show_results = function () { };

    const query_updated = function (value) {
      if (args.async) {
        args.data(value).then(ctl.vm.data);
      } else {
        ctl.vm.data(args.data.filter(args.filter.bind(null, value)));
      }
      return value;
    }

    return m('.combo-box-container', [
      m('.combo-box-controls', [
        m('input[type="text"]', {
          oninput: m.withAttr('value', R.compose(ctl.vm.query, query_updated)),
          value: ctl.vm.query()
        }),
        m('span.chevron')
      ]),
      m('.combo-box-results-container', [
        K.provided(
          function () { return !!(ctl.vm.data().length); },
          function () {
            return m('dl.combo-box-results', [
              (ctl.vm.data())
                .map(function (match, i) {
                  return m('.combo-box-match', {
                    key: i
                  }, args.get_match(match));
                })
            ]);
          })
      ]),

      K.iif(DEBUG, m('div', [
        m('code', [
          m('pre', [
            JSON.stringify({vm: ctl.vm}, null, 2)
          ])
        ])
      ]))
    ]);
  }
};
