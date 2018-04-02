const async_hooks = require('async_hooks');
const logger = require('./log');

const asyncArr = [];
const resArr = [];

const asyncHooks = cb => {
  function init(asyncId, type, triggerAsyncId, resource) {
    logger(`init: asyncId=${asyncId}  type=${type}  triggerAsyncId=${triggerAsyncId}`);
    asyncArr.push({
      asyncId,
      triggerAsyncId,
      type,
      isRelease: false,
      startTime: new Date().getTime(),
    });
  }

  function destroy(asyncId) {
    logger(`destroy: asyncId=${asyncId}`);
    let res = {};
    const asyncItem = asyncArr.filter(ele => {
      return ele.asyncId === asyncId && !ele.isRelease
    });

    if (asyncItem && asyncItem[0]) {
      const endTime = new Date().getTime();
      res = Object.assign(res, asyncItem[0], {
        endTime,
        isRelease: true,
        duration: endTime - asyncItem[0].startTime,
      });
      resArr.push(res);
      cb(res, resArr);
    } else {
      return false;
    }
  }

  async_hooks.createHook({
    init,
    destroy,
  }).enable();
};

module.exports = {
  create: asyncHooks,
  ...async_hooks,
};
