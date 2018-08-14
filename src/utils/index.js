import { Message } from 'element-ui';
export function param2Obj (url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};

export function img2Base64 (image) {
  let canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  let context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, image.width, image.height);
  const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
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
