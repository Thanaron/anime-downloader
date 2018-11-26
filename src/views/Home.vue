<template>
    <div style="margin-top: 20px">
        <div class="columns">
            <div class="column is-offset-1 is-10">
                <b-field>
                    <b-input :loading="loading" expanded placeholder="Search.." @input="reload"/>
                    <b-select v-model="selectedQuality" placeholder="Quality">
                        <option value="1080">1080p</option>
                        <option value="720">720p</option>
                        <option value="480">480p</option>
                    </b-select>
                </b-field>
            </div>
        </div>
        <div class="columns">
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
            value="Download {{ checkedRows.length }} episodes"
            @click="download"
        />
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
            ipcRenderer.send('reloadData', { name, quality });
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
