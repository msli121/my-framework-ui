<template>
  <div id="app">
    <!-- 路由的出入口，路由的内容将被显示在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
}
</script>

<style>
html, body {
  height: 100%;
}

#app {
  height: 100%;
}
</style>


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
