<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色配置</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table :data="roles" stripe style="width: 100%" :max-height="tableHeight">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="roleName" label="角色名" fit></el-table-column>
        <el-table-column prop="roleCode" label="角色码" fit></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value = "1"
                inactive-value = "0"
                @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editRole(scope.row)">编辑</el-button>
            <el-button type="text">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button>取消选择</el-button>
        <el-button>批量删除</el-button>
      </div>
    </el-card>
    <el-dialog
        title="修改角色信息"
        :visible.sync="dialogFormVisible">
      <el-form v-model="selectedRole" style="text-align: left" ref="dataForm">
        <el-form-item label="角色名" label-width="120px" prop="username">
          <el-input disabled v-model="selectedRole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色码" label-width="120px" prop="username">
          <el-input disabled v-model="selectedRole.roleCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="name">
          <el-input v-model="selectedRole.description" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="功能配置" label-width="120px" prop="perms">-->
<!--          <el-checkbox-group v-model="selectedPermsIds">-->
<!--            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc_}}</el-checkbox>-->
<!--          </el-checkbox-group>-->
<!--        </el-form-item>-->
        <el-form-item label="菜单配置" label-width="120px" prop="menusTree">
          <el-tree
              :data="menusTree"
              :props="treeProps"
              show-checkbox
              :default-checked-keys="selectedMenuCodes"
              node-key="menuCode"
              ref="tree">
          </el-tree>
        </el-form-item>
        <el-form-item label="功能配置" label-width="120px" prop="menusTree">
          <el-tree
              :data="menusTree"
              :props="treeProps"
              show-checkbox
              :default-checked-keys="selectedMenuCodes"
              node-key="menuCode"
              ref="tree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {editOrAddRole, getSysAllMenu, getSysAllMenuWithTree, getSysAllPermission, getSysAllRole} from "@/api/api";

export default {
  name: 'adminUserRole',
  data() {
    return {
      dialogFormVisible: false,
      roles: [],
      permissions: [],
      menus: [],
      menusTree: [],
      selectedRole: [],
      selectedPermissionCodes: [],
      selectedMenuCodes: [],
      treeProps: {
        id: 'menuCode',
        label: 'nameZh',
        children: 'children'
      }
    }
  },

  mounted() {
    this.getAllRole();
    this.getAllMenu();
    this.getAllMenuWithTree();
    this.getAllPermission();
  },

  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },

  methods: {

    getAllRole() {
      getSysAllRole().then(res => {
        if(res.flag === "T") {
          this.roles = res.data;
        }
      }).catch(e => {
        console.log("获取所有角色失败！");
        console.log(e);
      })
    },

    getAllPermission() {
      getSysAllPermission().then(res => {
        if(res.flag === "T") {
          this.permissions = res.data;
        }
      }).catch(e => {
        console.log("获取所有权限失败！");
        console.log(e);
      })
    },

    getAllMenu() {
      getSysAllMenu().then(res => {
        if(res.flag === "T") {
          this.menus = res.data;
        }
      }).catch(e => {
        console.log("获取所有菜单失败！");
        console.log(e);
      })
    },

    getAllMenuWithTree() {
      getSysAllMenuWithTree().then(res => {
        if(res.flag === "T") {
          this.menusTree = res.data;
        }
      }).catch(e => {
        console.log("获取所有菜单失败！");
        console.log(e);
      })
    },

    commitStatusChange(value, role) {
      if(role.name === 'admin') {
        this.$confirm("是否更改角色状态？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        })
      }
    },
    editRole(role) {
      // console.log("selected role", role);
      this.dialogFormVisible = true;
      this.selectedRole = role;
      let permissionCodes = [];
      for (let i = 0; i < role.permissions.length; i++) {
        permissionCodes.push(role.permissions[i].permissionCode)
      }
      this.selectedPermissionCodes = permissionCodes;
      let menuCodes = [];
      for(let i=0; i<role.menus.length; i++) {
        menuCodes.push(role.menus[i].menuCode);
        for(let j=0; j<role.menus[i].children[j].length; j++) {
          menuCodes.push(role.menus[i].children[j].menuCode);
        }
      }
      this.selectedMenuCodes = menuCodes;
      // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
      if(this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(menuCodes);
      }
    },

    onSubmit(role) {
      // 根据视图绑定的角色 roleCode 向后端传送角色信息
      let permissions = [];
      for(let i=0; i<this.selectedPermissionCodes.length; i++) {
        for(let j=0; j<this.permissions.length; j++) {
          if(this.selectedPermissionCodes[i] === this.permissions[j].permissionCode) {
            permissions.push(this.permissions[j]);
          }
        }
      }
      console.log("getCheckedKeys", this.$refs.tree.getCheckedKeys())
      let checkedMenuCodes = this.$refs.tree.getCheckedKeys();
      let menus = [];
      for(let i=0; i<this.menus.length; i++) {
        for(let j=0; j<checkedMenuCodes.length; j++) {
          if(checkedMenuCodes[j] === this.menus[i].menuCode) {
            menus.push(this.menus[i]);
          }
        }
      }
      role.menus = menus;
      role.permissions = permissions;
      editOrAddRole(role).then(res => {
        if(res.flag === "T") {
          this.$message.success("操作成功");
        } else {
          this.$message.error(res.msg);
        }
      }).catch(e => {
        this.console.log(e);
      })
    }
  }
}
</script>