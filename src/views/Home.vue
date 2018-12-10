<template>
    <div>
        <Titlebar/>
        <div id="content">
            <div style="margin-top: 10px" class="columns">
                <div class="column is-narrow" v-if="checkedRows.length > 0">
                    <a
                        class="button is-primary is-inverted has-background-white"
                        style="border: 0"
                        @click="downloadSelected"
                    >
                        <BIcon pack="fas" icon="arrow-circle-down" size="is-medium"/>
                    </a>
                </div>
                <div class="column">
                    <BField>
                        <BInput
                            v-model="searchInput"
                            expanded
                            placeholder="Search.."
                            @keyup.enter.native="search"
                        />
                        <BSelect v-model="selectedResolution">
                            <option value="1080">1080p</option>
                            <option value="720">720p</option>
                            <option value="480">480p</option>
                        </BSelect>
                    </BField>
                </div>
                <div class="column is-narrow">
                    <button
                        :class="{ button: true, 'is-primary': true, 'is-fullwidth': true, 'is-loading': loading }"
                        :disabled="loading"
                        @click="search"
                    >Search</button>
                </div>
            </div>
            <BTable
                :checked-rows.sync="checkedRows"
                :data="data"
                :loading="loading"
                checkable
                striped
                :mobile-cards="false"
                class="result-table"
            >
                <template slot-scope="props">
                    <BTableColumn
                        field="bot"
                        label="Bot"
                        sortable
                        width="200"
                        :visible="visibleColumns.includes('bot')"
                    >{{ props.row.bot }}</BTableColumn>
                    <BTableColumn
                        field="name"
                        label="Name"
                        :visible="visibleColumns.includes('name')"
                    >{{ props.row.name }}</BTableColumn>
                    <BTableColumn
                        field="episode"
                        label="Episode"
                        numeric
                        width="30"
                        :visible="visibleColumns.includes('episode')"
                    >{{ props.row.episode }}</BTableColumn>
                    <BTableColumn
                        field="resolution"
                        label="Resolution"
                        numeric
                        width="100"
                        :visible="visibleColumns.includes('resolution')"
                    >{{ props.row.resolution }}p</BTableColumn>
                    <BTableColumn
                        field="pack"
                        label="Pack"
                        numeric
                        width="100"
                        :visible="visibleColumns.includes('pack')"
                    >#{{ props.row.pack }}</BTableColumn>
                    <BTableColumn
                        field="size"
                        label="Size"
                        numeric
                        width="100"
                        :visible="visibleColumns.includes('size')"
                    >{{ props.row.size }} MB</BTableColumn>
                </template>
            </BTable>
            <div class="button-container">
                <a
                    class="button is-primary is-inverted has-background-white download-button"
                    style="border: 0"
                    @click="openSettings"
                >
                    <BIcon pack="fas" icon="cog" size="is-small"/>
                </a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Titlebar from '../components/Titlebar.vue';
import DownloadProgressModal from '../components/DownloadProgressModal.vue';
import SettingsModal from '../components/SettingsModal.vue';
import Packlist from '../packlist';

@Component({
    components: { Titlebar },
})
export default class Home extends Vue {
    loading: boolean = false;
    data: HSRelease[] = [];
    checkedRows: HSRelease[] = [];
    selectedResolution: string = '1080';
    searchInput: string = '';

    get visibleColumns() {
        return this.$store.state.visibleColumns;
    }

    search() {
        this.loading = true;
        Packlist.search(
            this.searchInput,
            this.selectedResolution,
            this.$store.state.uniqueEpisodesOnly
        ).then((result: any) => {
            this.data = result;
            this.loading = false;
        });
    }

    downloadSelected() {
        this.$modal.open({
            parent: this,
            component: DownloadProgressModal,
            hasModalCard: true,
            props: { list: this.checkedRows },
        });
    }

    openSettings() {
        this.$modal.open({
            parent: this,
            component: SettingsModal,
            hasModalCard: true,
        });
    }
}
</script>

<style lang="scss">
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

#content {
    height: calc(100% - 32px);
    padding: 30px;
    overflow-y: auto;
}
</style>
