'use strict';

const retryIfErr = require('./');

function testFn() {
  return new Promise((resolve, reject) => {
    if (Math.random() < 0.5) {
      console.log('s');
      resolve('success');
    } else {
      console.log('e');
      reject('error');
    }
  });
}

function testFn2(x) {
  console.log('x', x);
  return new Promise((resolve, reject) => {
    let y = Math.random();
    console.log('y', y);
    if (y < x) {
      console.log('s');
      resolve('success');
    } else {
      console.log('e');
      reject('error');
    }
  });
}

async function testFn3(x) {
  return await testFn2(x);
}

// 尝试3次 间隔1000ms 返回testFn数据
// retryIfErr(testFn, 5, 1000).then(console.log).catch(console.log);

// 参数放在最后依次列出
// retryIfErr(testFn2, 5, 1000, 0.3).then(console.log).catch(console.log);

// async
retryIfErr(testFn3, 5, 1000, 0.2).then(console.log).catch(console.log);