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
      <el-table :data="permissions" stripe style="width: 100%" :max-height="tableHeight">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="40"></el-table-column>
        <el-table-column prop="permissionCode" label="权限码" fit></el-table-column>
        <el-table-column prop="nameZh" label="权限名" fit></el-table-column>
        <el-table-column prop="groupCode" label="分组" fit></el-table-column>
        <el-table-column prop="parentPermissionCode" label="父级权限码" fit></el-table-column>
        <el-table-column prop="url" label="接口路径" fit></el-table-column>
        <el-table-column prop="description" label="权限描述" fit></el-table-column>
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
            <el-button type="text" @click="editPermission(scope.row)">编辑</el-button>
            <el-button type="text">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      <div style="margin: 20px 0 20px 0;float: left">-->
<!--        <el-button>取消选择</el-button>-->
<!--        <el-button>批量删除</el-button>-->
<!--      </div>-->
    </el-card>
    <el-dialog
        title="修改权限信息"
        :visible.sync="dialogFormVisible">
      <el-form v-model="selectedPermission" style="text-align: left" ref="dataForm">
        <el-form-item label="权限码" label-width="120px" prop="permissionCode">
          <el-input v-model="selectedPermission.permissionCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名" label-width="120px" prop="nameZh">
          <el-input v-model="selectedPermission.nameZh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分组" label-width="120px" prop="groupCode">
          <el-input v-model="selectedPermission.groupCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级权限码" label-width="120px" prop="parentPermissionCode">
          <el-input v-model="selectedPermission.parentPermissionCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口路径" label-width="120px" prop="url">
          <el-input v-model="selectedPermission.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" label-width="120px" prop="description">
          <el-input v-model="selectedPermission.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedPermission)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {editOrAddPermission, getSysAllPermission, updatePermissionStatus} from "@/api/api";

export default {
  name: 'adminUserRole',
  data() {
    return {
      dialogFormVisible: false,
      permissions: [],
      selectedPermission: [],
    }
  },

  mounted() {
    this.getAllPermission();
  },

  computed: {
    tableHeight () {
      return window.innerHeight - 300
    }
  },

  methods: {
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

    commitStatusChange(value, row) {
      this.$confirm("是否更改权限状态？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updatePermissionStatus(row).then(res => {
          if(res.flag === "T") {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(e => {
          console.log(e);
          this.$message.error("系统异常");
        })
      })
    },

    editPermission(permission) {
      this.selectedPermission = permission;
      this.dialogFormVisible = true;
    },

    onSubmit(permission) {
      editOrAddPermission(permission).then(res => {
        if(res.flag === "T") {
          this.$message.success("操作成功");
          this.getAllPermission();
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