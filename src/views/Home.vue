<template>
    <div style="margin-top: 20px;">
        <div class="columns" style="margin-left: 10px; margin-right: 10px;">
            <div class="column is-narrow">
                <a class="button is-primary is-inverted" style="border: 0" @click="openSettings">
                    <span class="icon is-small">
                        <i class="mdi mdi-36px mdi-settings"></i>
                    </span>
                </a>
            </div>
            <div class="column">
                <b-field>
                    <b-input
                        v-model="searchInput"
                        expanded
                        placeholder="Search.."
                        @keyup.enter.native="search"
                    />
                    <b-select v-model="selectedResolution" placeholder="Select resolution">
                        <option value="1080">1080p</option>
                        <option value="720">720p</option>
                        <option value="480">480p</option>
                    </b-select>
                </b-field>
            </div>
            <div class="column is-narrow">
                <button
                    :class="{ button: true, 'is-primary': true, 'is-fullwidth': true, 'is-loading': loading }"
                    :disabled="loading"
                    @click="search"
                >Search</button>
            </div>
        </div>
        <div class="result-table">
            <b-table
                :checked-rows.sync="checkedRows"
                :data="data.length > 0 ? data : []"
                :loading="loading"
                checkable
                striped
                :default-sort="['episode', 'asc']"
                :paginated="data.length > 0"
                per-page="12"
            >
                <template slot-scope="props">
                    <b-table-column
                        field="bot"
                        label="Bot"
                        sortable
                        width="200"
                        :visible="visibleColumns.includes('bot')"
                    >{{ props.row.bot }}</b-table-column>
                    <b-table-column
                        field="name"
                        label="Name"
                        sortable
                        :visible="visibleColumns.includes('name')"
                    >{{ props.row.name }}</b-table-column>
                    <b-table-column
                        field="episode"
                        label="Episode"
                        sortable
                        numeric
                        width="30"
                        :visible="visibleColumns.includes('episode')"
                    >{{ props.row.episode }}</b-table-column>
                    <b-table-column
                        field="resolution"
                        label="Resolution"
                        numeric
                        width="100"
                        :visible="visibleColumns.includes('resolution')"
                    >{{ props.row.resolution }}p</b-table-column>
                    <b-table-column
                        field="pack"
                        label="Pack"
                        numeric
                        width="100"
                        :visible="visibleColumns.includes('pack')"
                    >{{ props.row.pack }}</b-table-column>
                    <b-table-column
                        field="size"
                        label="Size"
                        numeric
                        width="100"
                        :visible="visibleColumns.includes('size')"
                    >{{ props.row.size }} MB</b-table-column>
                </template>

                <template slot="bottom-left">
                    <button
                        v-if="checkedRows.length > 0"
                        class="button has-background-link has-text-white"
                        @click="download"
                    >Download {{ checkedRows.length }} episodes</button>
                </template>
            </b-table>
        </div>
    </div>
</template>
<script>
import DownloadProgressModal from '../components/DownloadProgressModal.vue';
import SettingsModal from '../components/SettingsModal.vue';
import Packlist from '../packlist';

export default {
    data() {
        return {
            loading: false,
            data: [],
            checkedRows: [],
            selectedResolution: '1080',
            searchInput: '',
        };
    },
    computed: {
        visibleColumns() {
            return this.$store.getters.visibleColumns;
        },
    },
    methods: {
        search() {
            this.loading = true;
            const searchData = {
                name: this.searchInput,
                resolution: this.selectedResolution,
            };
            Packlist.search(searchData).then(result => {
                this.data = result;
                this.loading = false;

                Packlist.groupByEpisode(this.data);
            });
        },
        download() {
            this.$modal.open({
                parent: this,
                component: DownloadProgressModal,
                hasModalCard: true,
                props: { list: this.checkedRows },
            });
        },
        openSettings() {
            this.$modal.open({
                parent: this,
                component: SettingsModal,
                hasModalCard: true,
            });
        },
    },
};
</script>

<style scoped>
.result-table {
    margin-left: 20px;
    margin-right: 20px;
}
</style>
