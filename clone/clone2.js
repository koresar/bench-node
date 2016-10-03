function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = function cloneDeep(src) {
  if (src === undefined) return;

  var returnValue;
  if (isObject(src)) returnValue = {};
  else if (Array.isArray(src)) returnValue = [];
  else return src;

  Object.keys(src).forEach(function (key) {
    returnValue[key] = cloneDeep(src[key]);
  });

  return returnValue;
};
