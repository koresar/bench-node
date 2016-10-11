function isFunction(o) { return typeof o === 'function'; }

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; }
    return arr2;
  } else { return Array.from(arr); }
}

module.exports = function flatten2() {
  var fns = [];

  for (var i = 0; i < arguments.length; i += 1) {
    var arg = arguments[i];

    if (isFunction(arg)) {
      fns.push(arg);
    } else if (Array.isArray(arg)) {
      fns.push.apply(fns, _toConsumableArray(flatten2.apply(undefined, _toConsumableArray(arg)) || []));
    }
  }

  return fns.length === 0 ? undefined : fns;
};
