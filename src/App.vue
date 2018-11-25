<template>
  <div id="app">
    <home/>
  </div>
</template>

<script>
const log = require('electron-log');
const unhandled = require('electron-unhandled');

export default {
    created() {
        unhandled({ logger: log.error });
        Home,
    },
};
</script>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
}
</style>
