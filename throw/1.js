var Bluebird = require('bluebird');
var bar = require('../util').MemoryBar();
var suite = require('../util').MemSuite(bar);

console.log(process.version, 'throwing-vs-rejecting');

var error = new Error();

if (typeof Promise !== 'undefined') {
  suite
    .add('REJECT NATIVE P', function (deferred) {
      bar.refresh();
      Bluebird.try(function () {
        return Promise.reject(error);
      }).catch(function() {deferred.resolve();})
    }, {'defer': true});
}

suite
  .add('REJECT BLUEBIRD', function (deferred) {
    bar.refresh();
    Bluebird.try(function () {
      return Bluebird.reject(error);
    }).catch(function() {deferred.resolve();})
  }, {'defer': true})
  .add('THROW EXCEPTION', function (deferred) {
    bar.refresh();
    Bluebird.try(function () {
      return Promise.reject(error);
    }).catch(function() {deferred.resolve();})
  }, {'defer': true})
  .run();
