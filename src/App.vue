<template>
    <div>
        <titlebar></titlebar>
        <div id="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import Titlebar from './components/Titlebar.vue';
import SetupModal from './components/SetupModal.vue';

const log = require('electron-log');
const unhandled = require('electron-unhandled');

export default {
    components: {
        Titlebar,
    },
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

<style lang="scss">
#content {
    height: calc(100% - 32px);
    padding: 30px;
    overflow-y: auto;
}
</style>
