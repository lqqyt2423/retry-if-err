# retry-if-err

执行`promise` 函数，如碰到错误，进行重试。`then` 和`catch` 返回的参数保持与原函数`fn` 一致。

### install

```
npm install retry-if-err --save
```

### usage

```javascript
const retryIfErr = require('retry-if-err')
retryIfErr(fn, tryCount, tryInterval, ...params).then().catch()
```