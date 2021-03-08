package com.paper.server.system.configuration;

import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;

/**
 * @Description Shiro配置类
 * @Author msli
 * @Date 2021/01/14
 */

public class SysRealm extends AuthorizingRealm {

    @Autowired
    private UserServiceImpl userService;

    @Autowired
    private PermissionService permissionService;

    // 重写获取授权信息方法
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
//        // 获取当前用户的所有权限
//        String username = principalCollection.getPrimaryPrincipal().toString();
//        List<String> permissions = permissionService.listPermissionUrlByUserName(username);
//        Set<String> permissionSet =  new HashSet<>(permissions);
//        // 将权限放入授权信息中
//        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
//        simpleAuthorizationInfo.setStringPermissions(permissionSet);
//        return simpleAuthorizationInfo;
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        return simpleAuthorizationInfo;
    }

    // 获取认证信息，即根据 token 中的用户名从数据库中获取密码、盐等并返回
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        UserEntity userIdDb = null;
        String principal = token.getPrincipal().toString();
        // 通过 uid 查找用户
        userIdDb = userService.findUserByUid(principal);
        // 不存在抛出用户不存在异常
        if (ObjectUtils.isEmpty(userIdDb)) {
            throw new UnknownAccountException();
        }
        String passwordInDB = userIdDb.getPassword();
        String salt = userIdDb.getSalt();

        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(principal, passwordInDB, ByteSource.Util.bytes(salt), getName());
        return authenticationInfo;
    }
}
