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
                width="200"
                :visible="visibleColumns.bot === true"
            >{{ props.row.bot }}</BTableColumn>
            <BTableColumn
                field="name"
                label="Name"
                :visible="visibleColumns.name === true"
            >{{ props.row.name }}</BTableColumn>
            <BTableColumn
                field="episode"
                label="Episode"
                numeric
                width="30"
                :visible="visibleColumns.episode === true"
            >{{ props.row.episode }}</BTableColumn>
            <BTableColumn
                field="resolution"
                label="Resolution"
                numeric
                width="100"
                :visible="visibleColumns.resolution === true"
            >{{ props.row.resolution }}p</BTableColumn>
            <BTableColumn
                field="pack"
                label="Pack"
                numeric
                width="100"
                :visible="visibleColumns.pack === true"
            >#{{ props.row.pack }}</BTableColumn>
            <BTableColumn
                field="size"
                label="Size"
                numeric
                width="100"
                :visible="visibleColumns.size === true"
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

    onCheck(episodes: HSRelease[] | undefined, selected: HSRelease) {
        if (this.selectedEpisodes.includes(selected)) {
            this.$store.commit('removeSelectedEpisode', selected);
        } else {
            this.$store.commit('addSelectedEpisode', selected);
        }
    }

    onSelect(episode: HSRelease) {
        this.onCheck(undefined, episode);
    }
}
</script>

<style lang="scss">
.result-table {
    height: calc(100vh - 170px);
    box-sizing: border-box;
    overflow-y: auto;
}
</style>
