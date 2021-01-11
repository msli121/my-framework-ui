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
