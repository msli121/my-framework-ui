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
// 通过微信扫码验证/注册用户
export function loginByWechat(params) {
  return post("/login/we-chat", params);
}
/**
 * Admin Menu API
 */
// 获取当前登录用户所有菜单
export function getCurrentUserMenus() {
  return get("/admin/menu/current");
}
// 获取当前登录用户所有菜单，以树形结构展示
export function getCurrentUserMenusWithTree() {
  return get("/admin/menu/current/tree");
}
// 获取系统所有菜单
export function getSysAllMenu() {
  return get("/admin/menu/all");
}
// 获取系统所有菜单，以树形结构展示
export function getSysAllMenuWithTree() {
  return get("/admin/menu/all/tree");
}

/**
 * Admin User API
 */
// 获取系统所有用户
export function getSysAllUser() {
  return get("/admin/user/all");
}
// 设置用户状态
export function updateUserStatus(data) {
  return post("/admin/user/status", data)
}
// 修改用户密码
export function resetUserPassword(data) {
  return post("/admin/user/reset", data)
}
// 修改用户信息
export function editUserInfo(data) {
  return post("/admin/user/edit", data)
}
/**
 * Admin Role API
 */
// 获取系统所有角色
export function getSysAllRole() {
  return get("/admin/role/all");
}
// 更新角色菜单权限
export function updateRoleMenu(roleCode, data) {
  return post("/admin/role/update-menu/" + roleCode, data);
}
// 更新角色状态
export function updateRoleStatus(data) {
  return post("/admin/role/status", data)
}
// 编辑角色
export function editOrAddRole(data) {
  return post("/admin/role/edit-or-add", data);
}
/**
 * Admin permission API
 */
// 获取系统所有权限
export function getSysAllPermission() {
  return get("/admin/permission/all")
}
// 获取系统所有权限，以树形结构展示
export function getSysAllPermissionWithTree() {
  return get("/admin/permission/all/tree")
}
// 编辑权限
export function editOrAddPermission(data) {
  return post("/admin/permission/edit-or-add", data);
}
// 更新权限状态
export function updatePermissionStatus(data) {
  return post("/admin/permission/status", data)
}

/**
 * 业务 API
 */
// 上传单张照片
export function uploadSinglePicture(data) {
  return post("/ocr/single", data)
}