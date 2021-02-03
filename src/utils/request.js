import axios from "axios";
import Qs from 'qs';
import apiBaseUrl from "../base/baseUrl";


const instance = axios.create({
  timeout: 8000, // 请求超时时间
  baseURL: apiBaseUrl, // api 的 base_url,
  withCredentials: true, // 允许跨域使用 cookie
});
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// request 拦截器

// response 拦截器

/**
 * 封装get方法
 * @param url
 * @returns {Promise<unknown>}
 */
export function get(url) {
  return new Promise((resolve, reject) => {
    instance.get(url).then(res => {resolve(res.data)}).catch(e => {reject(e.data);})
  })
}

export function getWithParam(url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, { params: params })
        .then(res => {resolve(res.data)})
        .catch(e => {reject(e.data);})
  })
}

/**
 * post方法
 * @param url
 * @param data
 * @returns {Promise<unknown>}
 */
export function post(url, data) {
  return new Promise((resolve, reject) => {
    instance.post(url, data)
        .then(res => {resolve(res.data)})
        .catch(e => {reject(e.data);})
  })
}

/**
 * post方法，参数序列化
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function qspost(url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, Qs.stringify(params))
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data)
        })
  });
}

export default instance