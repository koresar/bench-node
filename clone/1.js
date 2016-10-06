var toHumanSize = require('../util').toHumanSize;
var bar = require('../util').MemoryBar(300 * 1024 * 1024);
var suite = require('../util').MemSuite(bar);

var json = require('./3MB.json');
var clone1 = require('./clone1');
var clone2 = require('./clone2');
var clone3 = require('./clone3');

console.log(process.version, toHumanSize(JSON.stringify(json).length), 'JSON');

suite
  .add('MIN MALLOC ', function () {
    clone1(json);
    bar.refresh();
  })
  .add('1 SCOPED FN', function () {
    clone2(json);
    bar.refresh();
  })
  .add('2 SCOPED FN', function () {
    clone3(json);
    bar.refresh();
  })
  .run();
