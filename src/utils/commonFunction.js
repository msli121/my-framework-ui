import {isEmpty} from "../base/api";

const toBase64 = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
];
export function uint8ClampedArrayToBase64(src) {
  let dstLen = Math.ceil(src.length * 4 / 3);
  let dst = new Array(dstLen);
  let pos = 0;
  let dstIndex = 0;
  let nextLeft = 0;
  src.forEach( b => {
    let r = 0;
    if (pos === 0) {
      r = b >> 2;
      dst[dstIndex++] = toBase64[nextLeft + r];
      nextLeft = (b & 0x03) << 4;
    } else if (pos === 1) {
      r = b >> 4;
      dst[dstIndex++] = toBase64[nextLeft + r];
      nextLeft = (b & 0x0F) << 2;
    } else if (pos === 2) {
      r = b >> 6;
      dst[dstIndex++] = toBase64[nextLeft + r];
      dst[dstIndex++] = toBase64[b & 0x3F];
      nextLeft = 0;
    }

    pos++;
    if (pos === 3) {
      pos = 0;
    }
  });
  if (pos !== 0) {
    dst[dstIndex] = toBase64[nextLeft];
  }
  return dst.join('');
}



export function getCurrentTime() {
  let yy = new Date().getFullYear();
  let mm =
      new Date().getMonth() < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
  let dd =
      new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
  let hh = new Date().getHours();
  let mf =
      new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
  let ss =
      new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
  return yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
}

export function checkSpecialChar(contentStr) {
  // 规则对象
  let exist = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]");
  // 判断是否存在特殊字符
  return exist.test(contentStr);
}

export function checkUsername(contentStr) {
  // 规则对象
  let regExp = new RegExp("^[\\u4e00-\\u9fa5\\w-&]{0,19}$");
  // let regExp = /^\u4e00-\u9fa5\w{0,19}/;
  return regExp.test(contentStr);
}

export function checkIsPhone(contentStr) {
  //手机号码
  let isPhone = /^1[3456789]\d{9}$/;
  // 座机格式
  // var isMob= /^0?1[0-9][0-9]\d{8}$/;
  return isPhone.test(contentStr);
}

export function checkUrlIsPdf(url) {
  if(isEmpty(url)) {
    return false;
  } else {
    let endStr = '.pdf';
    let leftLen = url.length - endStr.length;
    if (leftLen >= 0 && url.lastIndexOf(endStr) === leftLen) {
      return true;
    } else {
      return false;
    }
  }
}

