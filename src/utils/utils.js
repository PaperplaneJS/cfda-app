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

function date(datetime = new Date()) {
  return `${datetime.getFullYear()}-${datetime.getMonth()+1}-${datetime.getDate()}`;
}

export default { uuid, copy, date }
export { uuid, copy, date }