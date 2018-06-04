/**
 * ifly VUE 函数库
 * 2018-05-10：函数库建立
 */

export default {
  //常量：API基础地址
  baseUrl: "https://www.easy-mock.com/mock/5b06a51ba3065411030dc3c2/music",

  //函数：判断是否移动设备（无参数）
  isMobile() {
    let v = !1;
    const Agent = ["iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire"];
    const thisSys = navigator.userAgent.toLowerCase();
    for (let i in Agent) {
      thisSys.indexOf(Agent[i]) !== -1 && (v = !0);
    }
    return v;
  },

  //函数：判断是否低版本IE（无参数）
  isIE678() {
    return !+"\v1";
  },

  //函数：判断是否IE（无参数）
  isIE() {
    return !!window.VBArray;
  },

  //函数：判断是否Opera（无参数）
  isOpera() {
    return !!window.opera;
  },

  //函数：判断是否Firefox（无参数）
  isFirefox() {
    return !!window.GeckoActiveXObject;
  },

  //函数：判断是否Safari（无参数）
  isSafari() {
    return !!(navigator.vendor && navigator.vendor.match(/Apple/));
  },

  //函数：判断是否Chrome（无参数）
  isChrome() {
    return !!(window.chrome && window.google);
  },

  //函数：判断是否奇数（对象）
  isOdd(obj) {
    return !!(~~obj & 1);
  },

  //函数：判断是否数组（对象）
  isArray(obj) {
    return obj != null && typeof obj === "object" && "splice" in obj && "join" in obj;
  },

  //函数：判断是否NaN（对象）
  // isNaN(obj) {
  //   return obj !== obj;
  // },

  //函数：判断是否Null（对象）
  isNull(obj) {
    return obj === null;
  },

  //函数：判断是否Undefined（对象）
  isUndefined(obj) {
    return obj === void 0;
  },

  //函数：求字符串字节长度（字符串，汉字长度）
  byteLen(s, l = 2) {
    const arr = new Array(l + 1).join("-");
    return s.replace(/[^\x00-\xff]/g, arr).length;
  },

  //函数：格式化字符串（字符串）
  strFormat(s, obj) {
    const arr = Array.prototype.slice.call(arguments, 1);
    return s.replace(/\\?#{([^{}]+)\}/gm, function (m, n) {
      if (m.charAt(0) === "\\") return m.slice(1);
      if (Number(n) >= 0) return arr[Number(n)];
      if (obj && obj[n] !== void 0) return obj[n];
      return "";
    });
  },

  //函数：截取数字不足补零（数字，输出长度）
  fillZero(v, n = 2) {
    return ((1 << n).toString(2) + v).slice(-n);
  },

  //函数：获取随机颜色（无参数）
  randomColor() {
    return "#" + this.fillZero((~~(Math.random() * (1 << 24))).toString(16), 6);
  },

  //函数：数组随机打乱（数组）
  arrShuffle(arr) {
    for (let i = 1; i < arr.length; i++) {
      const r = ~~(Math.random() * (i + 1));
      [arr[i], arr[r]] = [arr[r], arr[i]];
    }
    return arr;
  },

  //函数：转义HTML脚本（字符串）
  escapeHTML(s) {
    s = "" + s;
    return s.replace(/&/g, "&#38;").replace(/</g, "&#60;").replace(/>/g, "&#62;").replace(/"/g, "&#34;").replace(/'/g, "&#39;");
  },

  //函数：还原HTML脚本（字符串）
  unescapeHTML(s) {
    s = "" + s;
    return s.replace(/&#39;/g, "'").replace(/&#34;/g, "\"").replace(/&#62;/g, ">").replace(/&#60;/g, "<").replace(/&#38;/g, "&");
  },

  //函数：页面跳转（地址）
  urlJump(url) {
    window.location.href = url;
  },

  //函数：获取URL参数（变量）
  getVar(s) {
    const r = new RegExp("(^|)" + s + "=([^&]*)(&|$)", "gi").exec(String(window.location.href));
    return !!r ? r[2] : "";
  }
}
