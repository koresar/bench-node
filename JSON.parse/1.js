var bar = require('../util').MemoryBar();
var suite = require('../util').MemSuite(bar);

var str = JSON.stringify(require('../util').getObject());
var buf = Buffer.from ? Buffer.from(str) : new Buffer(str);

suite
.add('PARSE buf', function () {
  JSON.parse(buf);
})
.add('PARSE buf->str', function () {
  JSON.parse(buf.toString());
})
.run();
