<template>
  <div class="header-logo-container">
    <img
      src="@/assets/icons/logo.jpg"
      height="40"
      width="40"
      @click="$router.push({ path: '/home/page' })"
      style="cursor: pointer;width: 36px; height: 36px;"
      alt="errorIcon"
      slot="reference"
    />
  </div>
</template>

<script>
export default {
  name: "headerLogo",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.header-logo-container {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
}
</style>