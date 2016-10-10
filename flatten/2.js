var _flatten = require('lodash/flatten');
var _filter = require('lodash/filter');
var noop = require('lodash/noop');
var bar = require('../util').MemoryBar();
var suite = require('../util').MemSuite(bar);

console.log(process.version, 1, 'item with undefined');

function isFunction(o) { return typeof o === 'function'; }

function flatten1() {
  var result = [];
  for (var i = 0; i < arguments.length; i += 1) {
    var arg = arguments.length <= i ? undefined : arguments[i];
    if (isFunction(arg)) result.push(arg);else if (Array.isArray(arg)) result = result.concat(arg.filter(isFunction));
  }
  return result.length === 0 ? undefined : result;
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
function flatten2() {
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
}

suite
  .add('FLATTEN 1', function () {
    flatten1(noop, undefined);
    bar.refresh();
  })
  .add('FLATTEN 2', function () {
    flatten2(noop, undefined);
    bar.refresh();
  })
  .add('LODASH FF', function () {
    _filter(_flatten(noop, undefined), isFunction);
    bar.refresh();
  })
  .run();
