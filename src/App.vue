<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
const log = require('electron-log');
const unhandled = require('electron-unhandled');

export default {
    created() {
        unhandled({ logger: log.error });
    },
};
</script>

<style lang="scss">
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
