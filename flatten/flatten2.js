function isFunction(o) { return typeof o === 'function'; }

module.exports = function () {
  var result = [];
  for (var i = 0; i < arguments.length; i += 1) {
    var arg = arguments.length <= i ? undefined : arguments[i];
    if (isFunction(arg)) result.push(arg);else if (Array.isArray(arg)) result = result.concat(arg.filter(isFunction));
  }
  return result.length === 0 ? undefined : result;
};
