if (typeof Promise === 'undefined') {
  throw new Error('Promises not supported');
}

if (typeof Promise.prototype.flatten === 'undefined') {
  Promise.prototype.flatten = flatten;
}

function flatten() {
  return this.then(ret => [undefined, ret]).catch(err => [err, undefined]);
}
