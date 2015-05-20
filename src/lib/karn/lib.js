const K = {

  noop: function () {},

  /// `provided`
  /// usage:
  /// ```
  /// var some_predicate = function () {
  ///   return true;
  /// };
  /// var a = [ // sparse array
  ///   1, 2, provided(some_predicate, always(3))
  /// ];
  /// var descr = provided(some_predicate, function (count) {
  ///   return 'count is now 1';
  /// }, [1]); // => 'count is now 1'
  provided: function Karn_provided(predicate, transform, args) {
    if ((predicate || K.noop)()) return transform.apply(this, args);
  },

  /// `iif` - inline if
  iif: function Karn_iif(bool, value) {
    if (bool) return value;
  }
};

module.exports = K;
