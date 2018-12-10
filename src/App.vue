<template>
    <RouterView class="app"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SetupModal from './components/SetupModal.vue';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

@Component
export default class App extends Vue {
    created() {
        unhandled({ logger: log.error });
        this.$store.dispatch('loadCurrentSettings');
    }

    mounted() {
        if (
            !this.$store.state.username ||
            this.$store.state.username.length === 0
        ) {
            this.$modal.open({
                component: SetupModal,
                hasModalCard: true,
                parent: this,
            });
        }
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
    animation: fadeIn 0.5s;
}
</style>
