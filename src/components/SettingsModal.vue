<template>
    <b-modal active has-modal-card :onCancel="closeModal" :canCancel="['x', 'outside', 'escape']">
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Settings</div>
            </header>
            <section class="modal-card-body">
                <div class="columns">
                    <div class="column">
                        <p
                            class="has-text-weight-semibold is-size-5"
                            style="margin-bottom: 15px"
                        >Application</p>
                        <b-field>
                            <b-checkbox v-model="autoDownload">Automatically start downloading</b-checkbox>
                        </b-field>
                        <hr>
                        <p
                            class="has-text-weight-semibold is-size-5"
                            style="margin-bottom: 15px"
                        >Updates</p>
                        <b-field>
                            <b-checkbox
                                disabled
                                v-model="autoCheckUpdate"
                            >Check for updates on startup</b-checkbox>
                        </b-field>
                    </div>
                    <div class="column">
                        <p
                            class="has-text-weight-semibold is-size-5"
                            style="margin-bottom: 15px"
                        >Search</p>
                        <div style="margin-bottom: 10px">
                            <b-field label="General">
                                <b-checkbox
                                    v-model="uniqueEpisodesOnly"
                                >Only show one result per episode</b-checkbox>
                            </b-field>
                        </div>
                        <div>
                            <b-field label="Visible columns">
                                <b-checkbox
                                    v-model="visibleColumns"
                                    :disabled="!uniqueEpisodesOnly"
                                    native-value="bot"
                                >Bot</b-checkbox>
                            </b-field>
                            <b-field>
                                <b-checkbox v-model="visibleColumns" native-value="name">Name</b-checkbox>
                            </b-field>
                            <b-field>
                                <b-checkbox v-model="visibleColumns" native-value="episode">Episode</b-checkbox>
                            </b-field>
                            <b-field>
                                <b-checkbox
                                    v-model="visibleColumns"
                                    native-value="resolution"
                                >Resolution</b-checkbox>
                            </b-field>
                            <b-field>
                                <b-checkbox v-model="visibleColumns" native-value="pack">Pack</b-checkbox>
                            </b-field>
                            <b-field>
                                <b-checkbox v-model="visibleColumns" native-value="size">Size</b-checkbox>
                            </b-field>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="closeModal">Close</button>
            </footer>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'SettingsModal',
    data() {
        return {};
    },
    computed: {
        visibleColumns: {
            get() {
                return this.$store.getters.visibleColumns;
            },
            set(val) {
                if (val.length === 0) {
                    return;
                }
                this.$store.commit('setVisibleColumns', val);
            },
        },
        autoDownload: {
            get() {
                return this.$store.getters.autoDownload;
            },
            set(val) {
                this.$store.commit('setAutoDownload', val);
            },
        },
        autoCheckUpdate: {
            get() {
                return this.$store.getters.autoCheckUpdate;
            },
            set(val) {
                this.$store.commit('setAutoCheckUpdate', val);
            },
        },
        uniqueEpisodesOnly: {
            get() {
                return this.$store.getters.uniqueEpisodesOnly;
            },
            set(val) {
                if (!val && !this.visibleColumns.includes('bot')) {
                    this.visibleColumns.push('bot');
                } else if (val && this.visibleColumns.includes('bot')) {
                    const index = this.visibleColumns.indexOf('bot');
                    this.visibleColumns.splice(index, 1);
                }
                this.$store.commit('setUniqueEpisodesOnly', val);
            },
        },
    },
    methods: {
        closeModal() {
            this.$parent.close();
        },
    },
};
</script>
