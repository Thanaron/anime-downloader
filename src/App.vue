<template>
    <div id="app">
        <titlebar></titlebar>
        <div id="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Titlebar from './components/Titlebar.vue';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

export default {
    components: {
        Titlebar,
    },
    created() {
        unhandled({ logger: log.error });
    },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
    display: none;
}

html,
body,
#app {
    height: 100%;
    margin: 0;
}

#content {
    height: calc(100% - 32px);
    padding: 20px;
    overflow-y: auto;
}

@import './assets/dark-theme.scss';
</style>
