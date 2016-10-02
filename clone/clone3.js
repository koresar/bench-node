var _ = require('lodash');

module.exports = function cloneDeep(src) {
  if (_.isUndefined(src)) return;

  var returnValue;
  if (_.isObject(src)) returnValue = {};
  else if (_.isArray(src)) returnValue = [];
  else return src;

  _.forEach(_.keys(src), function (key) {
    var srcValue = src[key];
    if (!_.isUndefined(srcValue)) {
      returnValue[key] = cloneDeep(srcValue);
    }
  });

  return returnValue;
};
