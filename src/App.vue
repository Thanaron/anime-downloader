<template>
    <div>
        <router-view/>
    </div>
</template>

<script>
import SetupModal from './components/SetupModal.vue';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

export default {
    created() {
        unhandled({ logger: log.error });
        this.$store.dispatch('loadCurrentSettings');
    },
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
    },
};
</script>