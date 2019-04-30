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

function date(dt = new Date()) {
  return `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
}

function datetime(dt = new Date()) {
  return `${date(dt)} ${dt.getHours()}:${dt.getMinutes()}`;
}

export default { uuid, copy, date, datetime }
export { uuid, copy, date, datetime }