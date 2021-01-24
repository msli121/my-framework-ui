<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-card style="margin: 18px 10px;width: 95%">
      <el-table :data="users" stripe :default-sort="{prop: 'id', order: 'ascending'}"
                style="width: 100%" :max-height="tableHeight">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" sortable width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" fit></el-table-column>
        <el-table-column prop="phone" label="手机号" fit></el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip fit></el-table-column>
        <el-table-column label="状态" sortable width="100">
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
            <el-button @click="editUser(scope.row)" type="text">
              编辑
            </el-button>
            <el-button type="text" @click="delUser(scope.row)" >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      <div style="margin: 20px 0 20px 0;float: left">-->
<!--        <el-button type="primary">取消选择</el-button>-->
<!--        <el-button type="info">批量删除</el-button>-->
<!--      </div>-->
    </el-card>
    <el-dialog
        title="修改用户信息"
        :visible.sync="dialogFormVisible">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <label>{{ selectedUser.username }}</label>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-button type="warning" @click="resetPassword(selectedUser.username)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRoleCodes">
            <el-checkbox v-for="(role, i) in roles" :key="i" :label="role.roleCode">{{ role.description }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {editUserInfo, getSysAllRole, getSysAllUser, updateUserStatus} from "../../../api/api";

export default {
  name: "adminUserBasic",
  data() {
    return {
      users: [],
      roles: [],
      tableLoading: false,
      dialogFormVisible: false,
      selectedUser: [],
      selectedRoleCodes: []
    }
  },
  mounted() {
    this.getAllUser();
    this.getAllRole();
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320;
    }
  },
  methods: {
    getAllUser() {
      let that = this;
      getSysAllUser().then(res => {
        if(res.flag === "T") {
          that.users = res.data;
        }
      }).catch(e => {
        console.log("获取所有user失败！");
        console.log(e);
      })
    },

    getAllRole() {
      let that = this;
      getSysAllRole().then(res => {
        if(res.flag === "T") {
          that.roles = res.data;
        }
      }).catch(e => {
        console.log("获取所有role失败！");
        console.log(e);
      })
    },

    commitStatusChange(value, user) {
      if (user.username !== 'admin') {
        updateUserStatus({
          enabled: value,
          username: user.username,
          userId: user.id
        }).then(res => {
          if (res && res.flag === "T") {
            if (value === "1") {
              this.$message.success('用户 [' + user.username + '] 已启用')
            } else {
              this.$message.success('用户 [' + user.username + '] 已禁用')
            }
          }
        }).catch(e => {
          this.$message.error("出错");
          console.log(e);
        })
      } else {
        user.enabled = "1";
        this.$message.error('不能禁用管理员账户')
      }
    },

    editUser (user) {
      this.dialogFormVisible = true;
      this.selectedUser = user;
      let roleCodes = []
      for (let i = 0; i < user.roles.length; i++) {
        roleCodes.push(user.roles[i].roleCode)
      }
      this.selectedRoleCodes = roleCodes;
    },

    resetPassword (username) {
      this.$axios.put('/admin/user/password', {
        username: username
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('密码已重置为 123')
        }
      })
    },
    delUser(user) {
      this.$message.error("无法删除用户[" + user.username + "]");
    },
    onSubmit(user) {
      let that = this;
      let roles = [];
      for(let i=0; i < that.selectedRoleCodes.length; i++) {
        for (let j = 0; j < that.roles.length; j++) {
          if (that.selectedRoleCodes[i] === that.roles[j].roleCode) {
            roles.push(that.roles[j])
          }
        }
      }
      user.roles = roles;
      editUserInfo(user).then(res => {
        if(res && res.flag === "T") {
          this.$message.success("用户信息修改成功");
          this.dialogFormVisible = false;
          // 修改角色后重新请求用户信息，实现视图更新
          this.getAllUser();
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  }
}
</script>