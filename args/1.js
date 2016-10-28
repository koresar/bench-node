var suite = require('../util').PerfSuite();

console.log(process.version, 'rest arguments');

function noop() {}
function applyArguments() {
  noop.apply(this, arguments);
}
function concatArguments() {
  noop.apply(this, [].concat(arguments));
}
function sliceArguments() {
  noop.apply(this, Array.prototype.slice(arguments));
}
function transpiledRest() {
  var args = [], len = arguments.length;
  while (len--) args[len] = arguments[len];
  return noop.apply(this, args);
}

if (+process.versions.node.split('.')[0] >= 6) {
  var nativeRest = require('./native-rest');
  suite.add('NATIVE REST ARG', function () {
    nativeRest(1, 2, 3, '4', '5', '6');
  });
}

suite
  .add('APPLY ARGUMENTS', function () {
    applyArguments(1, 2, 3, '4', '5', '6');
  })
  .add('CONCAT ARGUMENT', function () {
    concatArguments(1, 2, 3, '4', '5', '6');
  })
  .add('SLICE ARGUMENTS', function () {
    sliceArguments(1, 2, 3, '4', '5', '6');
  })
  .add('TRANSPILED REST', function () {
    transpiledRest(1, 2, 3, '4', '5', '6');
  })
  .run();
