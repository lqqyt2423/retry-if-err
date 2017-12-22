'use strict';

const splice = Array.prototype.splice;
const unshift = Array.prototype.unshift;

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

module.exports = function retryIfErr(fn, tryCount, tryInterval) {
  if (typeof fn !== 'function') throw new Error('传入的第一个参数必须为函数');
  tryCount = tryCount || 3;
  tryInterval = tryInterval || 1;
  splice.call(arguments, 0, 3);
  if (tryCount <= 1) {
    return Promise.resolve(fn.apply(this, arguments));
  } else {
    --tryCount;
    return Promise.resolve(fn.apply(this, arguments)).catch(() => {
      return sleep(tryInterval).then(() => {
        unshift.call(arguments, tryInterval);
        unshift.call(arguments, tryCount);
        unshift.call(arguments, fn);
        return retryIfErr.apply(this, arguments);
      });
    });
  }
};