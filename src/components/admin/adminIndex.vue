<template>
  <el-container id="admin-body">
    <el-header style="z-index: 1; height: 80px; margin-left: -20px">
      <admin-header style="position: absolute; width: 98%"></admin-header>
    </el-header>
    <el-container>
      <el-aside style="height: 112%; margin-top: -80px; width: 250px">
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import adminMenu from "./adminMenu";
import adminHeader from "./adminHeader";

export default {
  name: "AdminIndex",
  components: { adminMenu, adminHeader },
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    // this.$router.replace('/admin/dashboard')
  },
};
</script>

<style scoped>
#admin-body {
  height: 95vh;
}
</style>
