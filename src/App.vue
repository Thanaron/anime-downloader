<template>
    <RouterView class="app"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Theme } from './types/types';
import ApplicationTheme from './theme';

@Component
export default class App extends Vue {
    created() {
        this.$store.dispatch('config/loadCurrentSettings');
        ApplicationTheme.set(this.$store.state.config.selectedTheme);
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

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.app {
    -webkit-user-select: none;
    animation: fadeIn 500ms;
}

select {
    border-color: transparent;
}

a {
    outline: none;
}
</style>
