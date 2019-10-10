/***
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-19 18:42:06
 * @file:
 * @author: linkun.he
 */
/*
 * @FileName:
 * @Author: 朱满要
 * @Date: 2019-08-19 18:42:06
 */

// 时间的格式化
const formatTime = (time, type = 'YYYY-MM-DD') => {
  let date = new Date(time);
  let y = date.getFullYear();
  let m = date.getMonth();
  let d = date.getDay();
  let h = date.getHours();
  let mi = date.getMinutes();
  let s = date.getSeconds();

  if (type === 'YYYY-MM-DD') {
    if (type === 'YYYY-MM-DD hh:mm') {
      return `${y}-${init(m)}-${init(d)} ${init(h)}:${init(mi)}`;
    } else if (type === 'YYYY年MM月DD日 hh:mm') {
      return `${y}年${init(m)}月${init(d)}日 ${init(h)}:${init(mi)}`;
    } else if (type === 'MM月DD日 hh:mm') {
      return `${init(m)}月${init(d)}日 ${init(h)}:${init(mi)}`;
    } else if (type === 'YYYY-MM-DD HH:mm:ss') {
      return `${y}-${init(m)}-${init(d)} ${init(h)}:${init(mi)}:${init(s)}`;
    } else {
      return `${y}-${init(m)}-${init(d)}`;
    }
  }
};
const init = t => {
  if (t < 10) {
    return `0${t}`;
  } else {
    return t;
  }
};

// 删除对象中的空值
const deleteEmptyObj = obj => {
  const newObj = trimFormValue(obj);
  for (const key in newObj) {
    if (isEmpty(newObj[key]) && (newObj[key] !== 0 && !newObj[key])) {
      delete newObj[key];
    }
  }
  return newObj;
};

// 去除表单值的前后空格
const trimFormValue = obj => {
  for (const key in obj) {
    const val = obj[key];
    if (typeof val === 'number' || typeof val === 'string') {
      obj[key] = trim(val);
    }
  }
  return obj;
};

// 去除字符串的前后空格
const trim = str => {
  if (typeof str !== 'number' && !str) {
    return null;
  }
  if (typeof str === 'number') {
    return str;
  } else {
    return String(str).replace(/(^\s*)|(\s*$)/g, '');
  }
};

// 判断是否为空值 (true为空、false为不空)
const isEmpty = data => {
  return (data && data.length > 0) || data === 0 ? false : true;
};

// 所谓防抖，就是在事件触发后在规定的几秒内，函数只执行一次， 若在这几秒内又出发了事件，则重新计算该函数的执行时间
// 防抖（非立即执行版） (这里需要注意在页面初始化是将其赋值一次，即先调用一次)
const debounceNotNow = (fn, wait) => {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
    // timeout = setTimeout(fn, wait);
  };
};

// 防抖 （立即执行）(这里需要注意在页面初始化是将其赋值一次，即先调用一次)
const debounceNow = (fn, wait) => {
  let timeout;
  return function() {
    let context = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callNow) fn.apply(context, args);
  };
};

// 防抖 （包含立即执行和非立即执行， 默认立即执行【true:立即执行、false:非立即执行】）
const debounce = (fn, wait, immediate = true) => {
  let timeout = null;
  return function() {
    let context = this;
    let args = argument;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) fn.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, args);
      }, wait);
    }
  };
};

// 所谓节流，就是指连续触发事件,但是在n秒内只执行一次函数
// 节流
const throttle = (fn, wait) => {
  let timeout = null;
  return function() {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(context, args);
      }, wait);
    }
  };
};

// 深度赋值
const deepClone = obj => {
  let copy;
  if (typeof obj === null || typeof obj !== 'Objcet') return obj;

  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (obj instanceof Function) {
    copy = obj;
    return copy;
  }

  if (obj instanceof Array) {
    copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    copy = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) copy[key] = deepClone(obj[key]);
    }
    return copy;
  }

  throw new Error('unable to copy obj');
};

// 对象的深拷贝
const deepCopyObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * 四舍五入不精确的补充
 */
// 四舍五入的方法
Number.prototype.toFixed = function(d) {
  var s = this + '';
  if (!d) d = 0;
  if (s.indexOf('.') == -1) s += '.';
  s += new Array(d + 1).join('0');
  if (new RegExp('^(-|\\+)?(\\d+(\\.\\d{0,' + (d + 1) + '})?)\\d*$').test(s)) {
    var s = '0' + RegExp.$2,
      pm = RegExp.$1,
      a = RegExp.$3.length,
      b = true;
    if (a == d + 2) {
      a = s.match(/\d/g);
      if (parseInt(a[a.length - 1]) > 4) {
        for (var i = a.length - 2; i >= 0; i--) {
          a[i] = parseInt(a[i]) + 1;
          if (a[i] == 10) {
            a[i] = 0;
            b = i != 1;
          } else break;
        }
      }
      s = a.join('').replace(new RegExp('(\\d+)(\\d{' + d + '})\\d$'), '$1.$2');
    }
    if (b) s = s.substr(1);
    return (pm + s).replace(/\.$/, '');
  }
  return this + '';
};

module.exports = {
  formatTime,
  deleteEmptyObj,
  trimFormValue,
  trim,
  isEmpty,
  debounceNotNow,
  debounceNow,
  debounce,
  throttle,
  deepClone,
  deepCopyObject
};
