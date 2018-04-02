# async-hooks-logger

[async-hooks-logger](https://github.com/stephenkingsley/async-hooks-logger) provides an API to register callbacks tracking the lifetime of asynchronous resources created inside a Node.js application.

## Usage

```js
const asyncHooks = require('async-hooks-logger');
const fs = require('fs');
asyncHooks.create(data => {
  fs.writeSync(1, `async_hooks: ${JSON.stringify(data)} \n`);
});
```

### Structure

```json
{
  "asyncId": 79,
  "triggerAsyncId": 29,
  "type": "HTTPPARSER",
  "isRelease": true,
  "startTime": 1522663778957,
  "endTime": 1522663898959,
  "duration": 120002
}
```

you can use `duration` to finger out the resources lifetime.

## Deveop

```shell
git clone git@github.com:stephenkingsley/async-hooks-logger.git
cd async-hooks-logger
npm run dev
```

and your will see something in the iTerm!

```
async_hooks {"asyncId":79,"triggerAsyncId":29,"type":"WRITEWRAP","isRelease":true,"startTime":1522663778957,"endTime":1522663778957,"duration":0}
async_hooks {"asyncId":80,"triggerAsyncId":29,"type":"TickObject","isRelease":true,"startTime":1522663778957,"endTime":1522663778957,"duration":0}
async_hooks {"asyncId":81,"triggerAsyncId":29,"type":"TickObject","isRelease":true,"startTime":1522663778957,"endTime":1522663778957,"duration":0}
async_hooks {"asyncId":78,"triggerAsyncId":42,"type":"TCPWRAP","isRelease":true,"startTime":1522663778956,"endTime":1522663778958,"duration":2}
async_hooks {"asyncId":12,"triggerAsyncId":3,"type":"TickObject","isRelease":true,"startTime":1522663778957,"endTime":1522663778960,"duration":3}
async_hooks {"asyncId":13,"triggerAsyncId":12,"type":"TickObject","isRelease":true,"startTime":1522663778957,"endTime":1522663778960,"duration":3}
async_hooks {"asyncId":18,"triggerAsyncId":13,"type":"TickObject","isRelease":true,"startTime":1522663778959,"endTime":1522663778960,"duration":1}
async_hooks {"asyncId":19,"triggerAsyncId":17,"type":"TickObject","isRelease":true,"startTime":1522663778962,"endTime":1522663778962,"duration":0}
async_hooks {"asyncId":15,"triggerAsyncId":13,"type":"Timeout","isRelease":true,"startTime":1522663778959,"endTime":1522663898959,"duration":120000}
async_hooks {"asyncId":14,"triggerAsyncId":13,"type":"TIMERWRAP","isRelease":true,"startTime":1522663778959,"endTime":1522663898959,"duration":120000}
async_hooks {"asyncId":17,"triggerAsyncId":13,"type":"HTTPPARSER","isRelease":true,"startTime":1522663778959,"endTime":1522663898959,"duration":120000}
async_hooks {"asyncId":11,"triggerAsyncId":0,"type":"TCPWRAP","isRelease":true,"startTime":1522663778957,"endTime":1522663898959,"duration":120002}
```