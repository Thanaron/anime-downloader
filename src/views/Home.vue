<template>
    <div style="margin-top: 20px;">
        <div class="columns">
            <div class="column is-narrow" v-if="checkedRows.length > 0">
                <a
                    class="button is-primary is-inverted has-background-white"
                    style="border: 0"
                    @click="downloadSelected"
                >
                    <b-icon pack="fas" icon="arrow-circle-down" size="is-medium"></b-icon>
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
                    <b-select v-model="selectedResolution">
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
        <b-table
            :checked-rows.sync="checkedRows"
            :data="data"
            :loading="loading"
            checkable
            striped
            :mobile-cards="false"
            class="result-table"
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
                    :visible="visibleColumns.includes('name')"
                >{{ props.row.name }}</b-table-column>
                <b-table-column
                    field="episode"
                    label="Episode"
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
                >#{{ props.row.pack }}</b-table-column>
                <b-table-column
                    field="size"
                    label="Size"
                    numeric
                    width="100"
                    :visible="visibleColumns.includes('size')"
                >{{ props.row.size }} MB</b-table-column>
            </template>
        </b-table>
        <div class="button-container">
            <a
                class="button is-primary is-inverted has-background-white download-button"
                style="border: 0"
                @click="openSettings"
            >
                <b-icon pack="fas" icon="cog" size="is-small"></b-icon>
            </a>
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
            return this.$store.state.visibleColumns;
        },
    },
    methods: {
        search() {
            this.loading = true;
            Packlist.search(
                this.searchInput,
                this.selectedResolution,
                this.$store.state.uniqueEpisodesOnly
            ).then(result => {
                this.data = result;
                this.loading = false;
            });
        },
        downloadSelected() {
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

<style lang="scss" scoped>
.result-table {
    height: calc(95vh - 100px);
    box-sizing: border-box;
    overflow-y: auto;
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.download-button {
    position: fixed;
    bottom: -1px;
    left: -1px;
}
</style>
