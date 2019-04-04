function uuid(len, radix) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    uuid = [],
    i = 0;

  radix = radix || 16;
  len = len || 8;

  for (i = 0; i < len; i++) {
    uuid[i] = chars[0 | Math.random() * radix]
  }

  return uuid.join('');
}

function copy(item) {
  return JSON.parse(JSON.stringify(item));
}

export default { uuid, copy }
export { uuid, copy }