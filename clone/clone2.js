function isObject(value) {
  return value !== null && typeof value === 'object';
}

module.exports = function cloneDeep(src) {
  if (src === undefined) return;

  var returnValue;
  if (Array.isArray(src)) returnValue = [];
  else if (isObject(src)) returnValue = {};
  else return src;

  Object.keys(src).forEach(function (key) {
    returnValue[key] = cloneDeep(src[key]);
  });

  return returnValue;
};
