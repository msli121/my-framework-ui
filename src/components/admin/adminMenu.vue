<template>
  <el-menu
    :default-active="currentPath"
    class="el-menu-admin"
    router
    mode="vertical"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse">
    <el-submenu
      v-for="(item, i) in adminMenus"
      :key="i"
      :index="i.toString()"
      style="text-align: left">
      <span slot="title" style="font-size: 17px">
        <i :class="item.icon"></i>
        {{ item.nameZh }}
      </span>
      <el-menu-item
        v-for="child in item.children"
        :key="child.path"
        :index="child.path"
      >
        <i :class="child.icon"></i>
        {{ child.nameZh }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "adminMenu",
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    adminMenus() {
      return this.$store.state.adminMenus;
    },
    currentPath() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.el-menu-admin {
  border-radius: 5px;
  height: 100%;
}
</style>
