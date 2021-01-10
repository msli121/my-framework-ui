<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import home from "./views/home"

export default {
  name: "App",
  components: {home}
}
</script>


<style>

body {
  margin:8px 8px 0px 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
