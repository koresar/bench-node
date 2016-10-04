module.exports = function cloneDeep(src) {
  if (src === undefined) return;

  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var returnValue;
  if (Array.isArray(src)) returnValue = [];
  else if (isObject(src)) returnValue = {};
  else return src;

  Object.keys(src).forEach(function (key) {
    returnValue[key] = cloneDeep(src[key]);
  });

  return returnValue;
};
