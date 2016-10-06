var toHumanSize = require('../util').toHumanSize;
var bar = require('../util').MemoryBar(300 * 1024 * 1024);
var suite = require('../util').MemSuite(bar);

var json = require('./3MB.json');
var clone1 = require('./clone1');
var _cloneDeep = require('lodash/cloneDeep');
var JSONClone = function (obj) { return JSON.parse(JSON.stringify(obj)); };

console.log(process.version, toHumanSize(JSON.stringify(json).length), 'JSON');

suite
  .add('MIN MALLOC ', function () {
    clone1(json);
    bar.refresh();
  })
  .add('->STR->JSON', function () {
    JSONClone(json);
    bar.refresh();
  })
  .add('_.CLONEDEEP', function () {
    _cloneDeep(json);
    bar.refresh();
  })
  .run();
