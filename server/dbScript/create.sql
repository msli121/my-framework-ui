# drop database if exists `paper_web`;
# create database `paper_web` default character set utf8;
# use paper;

# 角色表
# drop table if exists `t_role`;
# create table `t_role` (
#     `id` int(11) not null auto_increment primary key,
#     `role_code` varchar(255) not null unique,
#     `role_name` varchar(255) not null,
#     `enabled` varchar(10) default '1',
#     `description` varchar(255) default null
# ) ENGINE=InnoDB auto_increment=1 default charset=utf8;

# 用户表
drop table if exists `t_user`;
create table `t_user` (
    `id` int(11) not null auto_increment primary key,
    `uid` varchar(255) not null unique,
    `username` varchar(255) not null,
    `has_emoji` tinyint(1) default 0 comment '昵称中是否包含emoji，0为包含，1为包含',
    `password` varchar(255) not null,
    `avatar` MEDIUMTEXT  comment '头像，base64 编码或url',
    `birthday` varchar(255) default '',
    `country`  varchar(100) default '',
    `province`  varchar(100) default '' ,
    `city`  varchar(100) default '',
    `organization` varchar(255) default '',
    `sex` varchar(10) default 'x' comment '用户性别，male为男性，female为女性，x为保密',
    `phone` varchar(50) default '',
    `email` varchar(255)  default '',
    `salt` varchar(255) default '',
    `sys_head_icon` varchar(255)  default '' comment '系统自动添加的头像',
    `user_type` varchar(100) default '' comment '用户类型，如weChat、qq',
    `open_id`  varchar(100) default '' comment '微信用户openId',
    `union_id`  varchar(100) default '' comment '微信用户unionId',
    `head_img_url`  varchar(255) default '' comment '微信用户头像',
    `enabled` varchar(10) default '1',
    `locked` varchar(10) default '0'
) ENGINE=InnoDB auto_increment=1 default charset=utf8;

# 角色用户关联表
drop table if exists `t_user_role`;
create table `t_user_role`(
    `id` int(11) not null auto_increment primary key,
    `user_id` int(11) not null,
    `role_code` varchar(255) default '',
    `description` varchar(255) default null
)ENGINE=InnoDB auto_increment=1 default charset=utf8;

# 菜单表
drop table if exists `t_menu`;
create table `t_menu` (
    `id` int(11) not null auto_increment primary key,
    `menu_code` varchar(255) not null unique,
    `path` varchar(255) default null,
    `name` varchar(255) default null,
    `name_zh` varchar(255) default null,
    `icon` varchar(255) default null,
    `component` varchar(255) default null,
    `parent_menu_code` varchar(255) default null,
    `description` varchar(255) default null
)  ENGINE=InnoDB auto_increment=1 default charset=utf8;

# 角色菜单关联表
drop table if exists `t_role_menu`;
create table `t_role_menu` (
    `id` int(11) not null auto_increment primary key,
    `role_code` varchar(255) default '',
    `menu_code` varchar(255) default '',
    `description` varchar(255) default null
) ENGINE=InnoDB auto_increment=1 default charset=utf8;

# 系统默认角色
# insert into t_role(role_name, role_code, description) values ('role_admin', 'ROLE_ADMIN', '管理员角色');
# insert into t_role(role_name, role_code, description) values ('role_dba', 'ROLE_DBA', '数据库管理员角色');
# insert into t_role(role_name, role_code, description) values ('role_default', 'ROLE_DEFAULT', '默认角色');
# insert into t_role(role_name, role_code, description) values ('role_guest', 'ROLE_GUEST', '游客角色');

# 系统菜单路由
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_USER', '/admin', 'admin', '用户管理', 'el-icon-user', 'adminIndex', null);
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_USER_BASIC',  '/admin/user/basic', 'adminUserBasic', '用户信息', 'el-icon-s-custom', 'user/adminUserBasic', 'MENU_ADMIN_USER');
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_USER_ROLE', '/admin/user/role', 'adminUserRole', '角色配置', 'el-icon-s-check', 'user/adminUserRole', 'MENU_ADMIN_USER');
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_USER_PERMISSION', '/admin/user/permission', 'adminPermission', '权限配置', 'el-icon-lock', 'user/adminPermission', 'MENU_ADMIN_USER');



# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_STATISTIC', '/admin', 'statistic', '数据统计', 'el-icon-s-data', 'adminIndex', null);
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_STATISTIC_OCR', '/admin/statistic/ocr', 'statistic_ocr', 'ocr', 'el-icon-coin', 'statistic/adminStatisticOcr', 'MENU_ADMIN_STATISTIC');
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_STATISTIC_PDF', '/admin/statistic/pdf', 'statistic_pdf', 'pdf', 'el-icon-coin', 'statistic/adminStatisticPdf', 'MENU_ADMIN_STATISTIC');
#
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_CONFIG', '/admin', 'config', '系统配置', 'el-icon-s-tools', 'adminIndex', null);
# insert into t_menu(menu_code, path, name, name_zh, icon, component, parent_menu_code) values ('MENU_ADMIN_CONFIG_SETTING', '/admin/config/setting', 'config_setting', '全局设置', 'el-icon-setting', 'config/adminConfigSetting', 'MENU_ADMIN_CONFIG');




# 添加角色和菜单映射表 测试使用
# admin 角色
# insert into t_role_menu(role_code, menu_code) values ('ROLE_ADMIN', 'MENU_ADMIN_USER');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_ADMIN', 'MENU_ADMIN_USER_BASIC');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_ADMIN', 'MENU_ADMIN_USER_ROLE');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_ADMIN', 'MENU_ADMIN_CONFIG');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_ADMIN', 'MENU_ADMIN_STATISTIC');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_ADMIN', 'MENU_ADMIN_STATISTIC_PDF');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_ADMIN', 'MENU_ADMIN_STATISTIC_OCR');

# default 角色
# insert into t_role_menu(role_code, menu_code) values ('ROLE_DEFAULT', 'MENU_ADMIN_USER');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_DEFAULT', 'MENU_ADMIN_USER_BASIC');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_DEFAULT', 'MENU_ADMIN_USER_ROLE');
# insert into t_role_menu(role_code, menu_code) values ('ROLE_DEFAULT', 'MENU_ADMIN_CONFIG');

# 添加admin/xiaosong用户 测试使用
# insert into t_user_role(user_id, role_code, description) values (1, 'ROLE_ADMIN', '拥有ROLE_ADMIN角色，测试使用');
# insert into t_user_role(user_id, role_code, description) values (2, 'ROLE_DEFAULT', '拥有ROLE_DEFAULT，测试使用');

# 数据权限
# 新增权限表
drop table if exists `t_permission`;
create table `t_permission` (
    `id` int not null auto_increment primary key,
    `group_code` varchar(255) default '',
    `permission_code` varchar(255) not null unique,
    `name_zh` varchar(255) default null,
    `parent_permission_code` varchar(255) default null,
    `url` varchar(255) default '',
    `enabled` varchar(10) default '1',
    `description` varchar(255) default ''
)ENGINE=InnoDB auto_increment=1 default charset=utf8;
# 添加测试数据
insert into t_permission(group_code, permission_code, name_zh, parent_permission_code, url, description)
       values ('admin', 'PERMISSION_ADMIN', '后台权限', '', '/api/admin', '系统后台权限'),
              ('admin', 'PERMISSION_ADMIN_USER', '用户管理', 'PERMISSION_ADMIN', '/api/admin/user/**', '系统后台用户管理的权限'),
              ('admin', 'PERMISSION_ADMIN_ROLE', '角色管理', 'PERMISSION_ADMIN', '/api/admin/role/**', '系统后台角色管理的权限'),
              ('admin', 'PERMISSION_ADMIN_PERMISSION', '权限管理', 'PERMISSION_ADMIN', '/api/admin/permission/**', '系统后台权限管理的权限'),

              ('ocr', 'PERMISSION_OCR', 'ocr接口权限', '', '/api/ocr', 'ocr接口的访问权限'),
              ('ocr', 'PERMISSION_OCR_VIP', 'VIP权限', 'PERMISSION_OCR', '/api/ocr/vip', 'VIP用户对ocr接口的访问权限'),
              ('ocr', 'PERMISSION_OCR_SUPER_VIP', 'SUPER_VIP权限', 'PERMISSION_OCR', '/api/ocr/super-vip', 'SuperVIP用户对ocr接口的访问权限'),

              ('pdf', 'PERMISSION_PDF', 'pdf接口权限', '', '/api/pdf', 'pdf接口的访问权限'),
              ('pdf', 'PERMISSION_PDF_VIP', 'pdf权限', 'PERMISSION_PDF', '/api/pdf/vip', 'VIP用户对pdf接口的访问权限'),
              ('pdf', 'PERMISSION_PDF_SUPER_VIP', 'SUPER_VIP权限', 'PERMISSION_PDF', '/api/pdf/super-vip', 'SuperVIP用户对pdf接口的访问权限');


# insert into t_permission(group_code, permission_code, url, description) values ('admin', 'PERMISSION_ADMIN_ALL_USERS', '/api/admin/user/all', '获取系统所有角色的接口权限');
#
# insert into t_permission(group_code, permission_code, url, description) values ('admin', 'PERMISSION_ADMIN_CURRENT_ROLES', '/api/admin/role/current', '获取当前登录用户所有角色的接口权限');
# insert into t_permission(group_code, permission_code, url, description) values ('admin', 'PERMISSION_ADMIN_ALL_ROLES', '/api/admin/role/all', '获取系统所有角色的接口权限');
#
# insert into t_permission(group_code, permission_code, url, description) values ('admin', 'PERMISSION_ADMIN_CURRENT_MENUS', '/api/admin/menu/current', '获取当前登录用户所有菜单的接口权限');
# insert into t_permission(group_code, permission_code, url, description) values ('admin', 'PERMISSION_ADMIN_ALL_MENUS', '/api/admin/menu/all', '获取系统所有菜单的接口权限');


# 新增角色与权限关联表
drop table if exists `t_role_permission`;
create table `t_role_permission` (
    `id` int(11) not null auto_increment primary key,
    `role_code` varchar(255) default '',
    `permission_code` varchar(255) default '',
    `description` varchar(255) default ''
)ENGINE=InnoDB auto_increment=1 default charset=utf8;

# 添加测试数据
# insert into t_role_permission(role_code, permission_code, description)
#     values ('ROLE_ADMIN', 'PERMISSION_ADMIN_ALL_USERS', 'admin/获取系统所有角色的接口权限'),
#            ('ROLE_ADMIN', 'PERMISSION_ADMIN_ALL_ROLES', 'admin/获取系统所有角色的接口权限'),
#            ('ROLE_ADMIN', 'PERMISSION_ADMIN_ALL_MENUS', 'admin/获取系统所有菜单的接口权限'),
#            ('ROLE_ADMIN', 'PERMISSION_ADMIN_CURRENT_ROLES', 'admin/获取当前登录用户所有角色的接口权限'),
#            ('ROLE_ADMIN', 'PERMISSION_ADMIN_CURRENT_MENUS', 'admin/获取当前登录用户所有菜单的接口权限');
# insert into t_role_permission(role_code, permission_code, description)
#     values ('ROLE_DEFAULT', 'PERMISSION_ADMIN_CURRENT_ROLES', 'default/获取当前登录用户所有角色的接口权限'),
#            ('ROLE_DEFAULT', 'PERMISSION_ADMIN_CURRENT_MENUS', 'default/获取当前登录用户所有菜单的接口权限');

insert into t_role_permission(role_code, permission_code, description)
values ('ROLE_ADMIN', 'PERMISSION_ADMIN', 'admin角色拥有系统后台权限'),
       ('ROLE_ADMIN', 'PERMISSION_ADMIN_USER', 'admin角色拥有系统后台用户管理的权限'),
       ('ROLE_ADMIN', 'PERMISSION_ADMIN_ROLE', 'admin角色拥有系统后台角色管理的权限'),
       ('ROLE_ADMIN', 'PERMISSION_ADMIN_PERMISSION', 'admin角色拥有系统后台权限管理的权限'),

       ('ROLE_ADMIN', 'PERMISSION_OCR', 'admin角色拥有ocr接口的访问权限'),
       ('ROLE_ADMIN', 'PERMISSION_OCR_VIP', 'admin角色拥有IP用户对ocr接口的访问权限'),
       ('ROLE_ADMIN', 'PERMISSION_OCR_SUPER_VIP', 'admin角色拥有SuperVIP用户对ocr接口的访问权限'),

       ('ROLE_ADMIN', 'PERMISSION_PDF', 'admin角色拥有pdf接口的访问权限'),
       ('ROLE_ADMIN', 'PERMISSION_PDF_VIP', 'admin角色拥有IP用户对pdf接口的访问权限'),
       ('ROLE_ADMIN', 'PERMISSION_PDF_SUPER_VIP', 'admin角色拥有SuperVIP用户对pdf接口的访问权限');

# 新增系统文件表，存储 base64 编码后的文件
drop table if exists `t_sys_file`;
create table `t_sys_file` (
    `id` int(11) not null auto_increment primary key,
    `uid` varchar(255) not null comment '用户uid',
    `file_name` varchar(255) not null comment '文件名',
    `file_type` varchar(255) not null comment '文件类型',
    `file_size` int comment '文件大小，单位b',
    `file_content` MEDIUMTEXT  comment '文件内容',
    `recognition_content` MEDIUMTEXT  comment '文件识别内容',
    `source_group` varchar(50) default '' comment '文件源分组，如avatar,ocr,pdf',
    `star` tinyint(1) default 0 comment '文件是否收藏，0为收藏，1收藏',
    `upload_time` timestamp not null default NOW() comment '上传时间'
)ENGINE=InnoDB auto_increment=1 default charset=utf8;



