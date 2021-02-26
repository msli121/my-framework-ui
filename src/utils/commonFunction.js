
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

