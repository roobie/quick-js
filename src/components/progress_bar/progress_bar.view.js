var VIEW
, m = require('mithril')
;

require('./progress_bar.less');

function truncateDecimals(value, decimalCount) {
  /// Number -> String
  if (!value || !value.toFixed) {
    return (0).toFixed(decimalCount);
  }
  return value.toFixed(decimalCount);
}

module.exports = function ProgressBar_view(ctl, args) {
  return m('div.progress', [
    m('div.progress-bar', {
      'role': "progressbar",
      'aria-valuenow': truncateDecimals(ctl.percent(), args.decimalCount),
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'style': {
        'width': ctl.percent() + '%'
      }
    }, [
      m('span', {
        class: 'sr-only'
      }, truncateDecimals(ctl.percent(), args.decimalCount) + '% Complete')
    ])
  ]);
};
