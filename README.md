# `Promise.prototype.flatten` function

- [Spec in progress](http://asilvas.github.io/proposal-promise-flatten/)


## Champions

- Work in progress


## Status

This proposal is stage 0 in the [TC39 Process](https://tc39.github.io/process-document/).


## Inspired By

https://twitter.com/DavidWells/status/1119729914876284928


## Examples

While `try -> catch` works well, it introduces a lot of noise into software that can be avoided.

Consider:

```
async function test(promise1, promise2, promise3) {
  let val1, val2, val3;

  try {
    val1 = await promise1;
  } catch (ex) {
    // ignore exceptions
  }

  try {
    [val2, val3] = await Promise.all([promise2, promise3]);
  } catch (ex) {
    throw ex; // throw to caller
  }

  return val1 + val2 + val3;
}
```

Above contains a fair amount of boilerplate for a relatively simple logic flow. Now let's look at
an alternative using `flatten`:

```
async function test(promise1, promise2, promise3) {
  const [, val1] = await promise1.flatten(); // ignore exceptions
  const [err, [val2, val3] = []] = await Promise.all([promise2, promise3]).flatten();

  if (err) throw err; // throw to caller

  return val1 + val2 + val3;
}
```

Under the covers both examples accomplish the same, but `flatten` can reduce code footprint and increase readability.


## Polyfill

```
function flatten() {
  return this.then(ret => [undefined, ret]).catch(err => [err, undefined]);
}
```

Doesn't get much simpler than this. Tests included.


## Discussion

https://twitter.com/Aaron_Silvas/status/1120721934730137601
