const test = require('ava');
require('../polyfill');

test('Promise.prototype.flatten defined', t => {
  t.is(typeof Promise.prototype.flatten, 'function', 'typeof flatten');
});

test('reject handling', async t => {
  const ret = await Promise.reject('oops').flatten();
  t.is(ret.length, 2, 'tuple returned');
  t.is(ret[0], 'oops', 'reject valid');
  t.is(ret[1], undefined, 'resolve valid');
});

test('resolve handling', async t => {
  const ret = await Promise.resolve(1).flatten();
  t.is(ret.length, 2, 'tuple returned');
  t.is(ret[0], undefined, 'reject valid');
  t.is(ret[1], 1, 'resolve valid');
});

test('reject undefined', async t => {
  const ret = await Promise.reject().flatten();
  t.is(ret.length, 2, 'tuple returned');
  t.is(ret[0], undefined, 'reject valid');
  t.is(ret[1], undefined, 'resolve valid');
});

test('resolve undefined', async t => {
  const ret = await Promise.resolve().flatten();
  t.is(ret.length, 2, 'tuple returned');
  t.is(ret[0], undefined, 'reject valid');
  t.is(ret[1], undefined, 'resolve valid');
});

test('Promise.all with results', async t => {
  const promise1 = Promise.resolve(1);
  const promise2 = Promise.resolve(2);
  const ret = await Promise.all([ promise1, promise2 ]).flatten();
  t.is(ret.length, 2, 'tuple returned');
  const [err, [result1, result2] = []] = ret;
  t.is(err, undefined, 'promise2 error');
  t.is(result1, 1, 'promise1 result undefined');
  t.is(result2, 2, 'promise2 result undefined');
});

test('Promise.all with errors', async t => {
  const promise1 = Promise.resolve(1);
  const promise2 = Promise.reject('promise2 error');
  const ret = await Promise.all([ promise1, promise2 ]).flatten();
  t.is(ret.length, 2, 'tuple returned');
  const [err, [result1, result2] = []] = ret;
  t.is(err, 'promise2 error', 'promise2 error');
  t.is(result1, undefined, 'promise1 result undefined');
  t.is(result2, undefined, 'promise2 result undefined');
});
