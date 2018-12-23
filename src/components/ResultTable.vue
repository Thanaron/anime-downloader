<template>
    <BTable
        :checked-rows.sync="selectedEpisodes"
        :data="tableData"
        checkable
        striped
        :mobile-cards="false"
        @check="onCheck"
        @select="onSelect"
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
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { HSRelease } from '../types/types';

@Component
export default class ResultTable extends Vue {
    emptyText: string = '';

    get visibleColumns() {
        return this.$store.state.config.visibleColumns;
    }

    get tableData(): HSRelease[] {
        return this.$store.state.app.tableData;
    }

    get selectedEpisodes(): HSRelease[] {
        return this.$store.state.app.selectedEpisodes;
    }

    set selectedEpisodes(value) {
        this.$store.dispatch('setSelectedEpisodes', value);
    }

    onCheck(episodes: HSRelease[] | null, selected: HSRelease) {
        if (this.selectedEpisodes.includes(selected)) {
            this.$store.commit('removeSelectedEpisode', selected);
        } else {
            this.$store.commit('addSelectedEpisode', selected);
        }
    }

    onSelect(episode: HSRelease) {
        this.onCheck(null, episode);
    }
}
</script>

<style lang="scss">
.result-table {
    height: calc(94vh - 100px);
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
