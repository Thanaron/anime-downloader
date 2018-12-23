<template>
    <RouterView class="app"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

@Component
export default class App extends Vue {
    created() {
        unhandled({ logger: log.error, showDialog: false });
        this.$store.dispatch('loadCurrentSettings');
    }
}
</script>
<style lang="scss">
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.app {
    -webkit-user-select: none;
    animation: fadeIn 500ms;
}
</style>
