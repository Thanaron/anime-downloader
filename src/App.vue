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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
