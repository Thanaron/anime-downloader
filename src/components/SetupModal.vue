<template>
    <BModal active has-modal-card>
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Setup</div>
            </header>
            <section class="modal-card-body">
                <p>In order to download anime, you are required to provide a username.
                    <br>This username will only be used when connecting to the IRC channel.
                </p>
                <br>
                <div class="columns">
                    <div class="column">
                        <BField
                            :type="{ 'is-danger': hasError }"
                            :message="{ 'Unable to generate random username. Please try again': hasError }"
                        >
                            <BInput expanded v-model="username" placeholder="Username"/>
                        </BField>
                    </div>
                    <div class="column is-narrow">
                        <button
                            :class="{button: true, 'is-loading': loading}"
                            :disabled="loading"
                            @click="generateRandom"
                        >Random</button>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button
                    class="button is-pulled-right"
                    v-if="!username || username.length === 0"
                    @click="skip"
                >Skip</button>
                <button class="button is-primary" v-else @click="setUsername">Continue</button>
            </footer>
        </div>
    </BModal>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Component from 'vue-class-component';

@Component
export default class SetupModal extends Vue {
    private username: string = '';
    private loading: boolean = false;
    private hasError: boolean = false;

    closeModal() {
        (this.$parent as any).close();
    }

    generateRandom() {
        this.loading = true;
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
                this.username = response.data;
                this.loading = false;
                this.hasError = false;
            })
            .catch(() => {
                this.hasError = true;
                this.loading = false;
            });
    }

    skip() {
        this.generateRandom()
            .then(this.setUsername)
            .then(this.closeModal);
    }

    setUsername() {
        return this.$store.dispatch('set', {
            key: 'username',
            value: this.username,
        });
    }
}
</script>
