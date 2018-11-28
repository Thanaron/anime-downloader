<template>
    <div style="margin-top: 32px">
        <div class="columns">
            <div class="column is-offset-1 is-8">
                <b-field>
                    <b-input
                        v-model="searchInput"
                        expanded
                        placeholder="Search.."
                        @keyup.enter.native="search"
                    />
                    <b-select v-model="selectedResolution" placeholder="Quality">
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
                :paginated="data.length > 0"
                per-page="12"
            >
                <template slot-scope="props">
                    <b-table-column field="bot" label="Bot" sortable width="200">{{ props.row.bot }}</b-table-column>
                    <b-table-column field="name" label="Name" sortable centered>{{ props.row.name }}</b-table-column>
                    <b-table-column
                        field="episode"
                        label="Episode"
                        sortable
                        numeric
                        width="30"
                    >{{ props.row.episode }}</b-table-column>
                    <b-table-column
                        field="resolution"
                        label="Resolution"
                        numeric
                        width="100"
                    >{{ props.row.resolution }}p</b-table-column>
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
    },
};
</script>

<style scoped>
.result-table {
    margin-left: 20px;
    margin-right: 20px;
}
</style>
