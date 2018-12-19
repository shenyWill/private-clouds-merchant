import {
  Message
} from 'element-ui';
export function param2Obj (url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};

export function img2Base64 (image, mimeType = 'png') {
  let canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, image.width, image.height);
  const ext = mimeType === 'png' ? 'png' : 'jpeg';
  return canvas.toDataURL(`image/${ext}`);
}

export function base64Length (string) {
  if (string.length >= 2097152) {
    Message({
      type: 'error',
      message: '图片过大'
    });
    return false;
  }
  return true;
}

export function scollTop (val) {
  document.documentElement.scrollTop -= val;
  if (document.documentElement.scrollTop > 0) {
    var topTime = setTimeout(() => scollTop(val), 10);
  } else {
    clearTimeout(topTime);
  }
}

export function parseTime (obj) {
  if (!obj) {
    return '';
  }
  let date = new Date(obj);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
  const seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
}

export function isValidIP (ip) {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
}

export function fileType (name) {
  if (!name) return '';
  const dotIndex = name.lastIndexOf('.');
  const type = name.substring(dotIndex + 1).toLowerCase();
  return type;
}

export function isImage (name) {
  const type = fileType(name);
  const lists = ['jpg', 'png', 'jpeg'];
  for (let i = 0; i < lists.length; i++) {
    if (type === lists[i]) return true;
  }
  return false;
}

export function numToPercent (num) {
  if (!num) return 0;
  const percent = Math.floor(num * 10000);
  return percent / 100;
}

const isType = (obj, type) => {
  if (typeof obj !== 'object') return false;
  // 判断数据类型的经典方法：
  const typeString = Object.prototype.toString.call(obj);
  let flag;
  switch (type) {
    case 'Array':
      flag = typeString === '[object Array]';
      break;
    case 'Date':
      flag = typeString === '[object Date]';
      break;
    case 'RegExp':
      flag = typeString === '[object RegExp]';
      break;
    default:
      flag = false;
  }
  return flag;
};

const getRegExp = re => {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};

export function deepClone (parent) {
  const parents = [];
  const children = [];

  const _clone = parent => {
    if (parent === null) return null;
    if (typeof parent !== 'object') return parent;

    let child, proto;

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = [];
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime());
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent);
      // 利用Object.create切断原型链
      child = Object.create(proto);
    }

    // 处理循环引用
    const index = parents.indexOf(parent);

    if (index !== -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index];
    }
    parents.push(parent);
    children.push(child);

    for (let i in parent) {
      // 递归
      child[i] = _clone(parent[i]);
    }

    return child;
  };
  return _clone(parent);
}
