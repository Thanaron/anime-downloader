<template>
    <div style="margin-top: 20px;">
        <div class="columns">
            <div class="column is-offset-1 is-8">
                <b-field>
                    <b-input
                        v-model="searchInput"
                        expanded
                        placeholder="Search.."
                        @keyup.enter.native="reload"
                    />
                    <b-select v-model="selectedQuality" placeholder="Quality">
                        <option value="1080">1080p</option>
                        <option value="720">720p</option>
                        <option value="480">480p</option>
                    </b-select>
                </b-field>
            </div>
            <div class="column is-2">
                <button
                    :class="{ button: true, 'is-primary': true, 'is-fullwidth': true, 'is-loading': loading }"
                    :disabled="loading"
                    @click="reload"
                >Search</button>
            </div>
        </div>
            <div class="column is-10 is-offset-1">
                <b-table
                    :checked-rows.sync="checkedRows"
                    :columns="columns"
                    :data="data"
                    :loading="loading"
                    :mobile-cards="false"
                    checkable
                    focusable
                    striped
                />
            </div>
        </div>
        <button
            v-if="checkedRows.length > 0"
            class="button has-background-link has-text-white"
            style="position: fixed; bottom: 10px; right: 10px;"
            @click="download"
        >Download {{ checkedRows.length }} episodes</button>
    </div>
</template>
<script>
import Download from '../components/Download.vue';

const { ipcRenderer } = require('electron');

export default {
    data() {
        return {
            loading: false,
            data: [],
            columns: [
                {
                    field: 'bot',
                    label: 'Bot',
                    sortable: true,
                },
                {
                    field: 'filename',
                    label: 'Filename',
                    sortable: true,
                },
                {
                    field: 'pack',
                    label: 'Pack',
                    numeric: true,
                },
                {
                    field: 'size',
                    label: 'Size',
                },
            ],
            checkedRows: [],
            selectedQuality: '1080',
        };
    },
    mounted() {
        ipcRenderer.on('updateTable', (event, data) => {
            this.data = data;
            this.loading = false;
        });
    },
    methods: {
        reload(name) {
            const quality = this.selectedQuality;
            ipcRenderer.send('searchAnime', name);
            this.loading = true;
        },
        download() {
            this.checkedRows.forEach(element => {
                element.progress = 0;
            });

            this.$modal.open({
                parent: this,
                component: Download,
                hasModalCard: true,
                props: { list: this.checkedRows },
            });
        },
    },
};
</script>
