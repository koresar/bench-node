var _ = require('lodash');

module.exports = function cloneDeep(src) {
  if (_.isUndefined(src)) return;

  var returnValue;
  if (_.isObject(src)) returnValue = {};
  else if (_.isArray(src)) returnValue = [];
  else return src;

  _.forEach(src, function (value, key) {
    returnValue[key] = cloneDeep(value);
  });
  return returnValue;
};
