function isFunction(o) { return typeof o === 'function'; }

var concat = Array.prototype.concat;
module.exports = function flatten3() {
  var fns = concat.apply([], arguments).filter(isFunction);
  return fns.length === 0 ? undefined : fns;
};
