<template>
    <RouterView class="app"/>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

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
            !this.$store.state.config.username ||
            this.$store.state.config.username.length === 0
        ) {
            this.generateRandom();
        }
    }
    generateRandom() {
        this.$store.commit('newStatus', 'Generating username..');
        return axios
            .get('https://passwordrandom.com/query', {
                params: {
                    command: 'password',
                    count: 1,
                    format: 'plain',
                    scheme: 'cvcvvcv',
                },
            })
            .then(response => {
                this.setUsername(response.data);
                this.$store.commit('newStatus', 'Ready');
            });
    }

    setUsername(username: string) {
        this.$store.dispatch('set', {
            key: 'username',
            value: username,
        });
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
