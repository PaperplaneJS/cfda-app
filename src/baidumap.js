export default function BDMap(ak) {
  return new Promise(function (resolve, reject) {
    if (window.BMap) {
      resolve(window.BMap);
    } else {
      window.onload = function () {
        resolve(window.BMap);
      }

      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `http://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=init`;
      script.onerror = reject;
      document.head.appendChild(script);
    }
  })
}