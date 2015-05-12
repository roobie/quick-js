/// ProgressBar
/// Usage: `m.component(ProgressBar, { percent: m.prop(42) })`
/// Renders a progress bar with the relative width according to the
/// value in the supplied prop.

module.exports = {
  controller: require('./progress_bar.controller.js'),
  view: require('./progress_bar.view.js')
};
