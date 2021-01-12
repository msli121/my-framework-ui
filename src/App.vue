<template>
  <div id="app">
    <!-- 路由的出入口，路由的内容将被显示在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import home from "./views/home"

export default {
  name: "App",
  // components: {home}
}
</script>


<style>

body {
  margin:0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
