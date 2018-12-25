<template>
    <div>
        <Search/>
        <ResultTable/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Search from '../../components/Search.vue';
import ResultTable from '../../components/ResultTable.vue';

@Component({
    components: {
        Search,
        ResultTable,
    },
})
export default class Home extends Vue {}
</script>

