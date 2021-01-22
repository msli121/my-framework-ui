import { get, post } from "../utils/request";

// 登录
export function login(username, password) {
  return post("/login", {username, password});
}
// 注册
export function registry(username, password) {
  return post("/registry", {username, password});
}
// 退出登录
export function logout() {
  return get("/logout");
}
// 验证接口
export function checkAuthentication() {
  return get("/authentication");
}
/**
 * Admin Menu API
 */
// 获取当前登录用户所有菜单
export function getCurrentUserMenus() {
  return get("/admin/menu/current");
}

/**
 * Admin User API
 */
// 获取系统所有用户
export function getSysAllUser() {
  return get("/admin/user/all");
}
// 设置用户状态
export function updateUserSate(data) {
  return post("/admin/user/status", data)
}
