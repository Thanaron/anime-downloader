<template>
    <RouterView class="app"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Theme } from '@/types/types';
import ApplicationTheme from '@/common/theme';
import logger, { setLevel } from '@/common/utils/logger';

@Component
export default class App extends Vue {
    created() {
        logger.debug('Preparing application');

        this.$store.dispatch('config/loadCurrentSettings');
        ApplicationTheme.set(this.$store.state.config.selectedTheme);

        setLevel(this.$store.state.config.logLevel);

        logger.debug('Creating application..');
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
