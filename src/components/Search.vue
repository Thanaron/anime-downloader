<template>
    <div style="margin-top: 10px" class="columns">
        <div class="column is-narrow" v-if="downloadPossible">
            <RouterLink to="/download">
                <a class="button is-primary is-inverted has-background-white" style="border: 0">
                    <BIcon pack="fas" icon="download" size="is-medium"/>
                </a>
            </RouterLink>
        </div>
        <div class="column">
            <BField>
                <BInput
                    expanded
                    placeholder="Enter anime name.."
                    v-model="input"
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
                :class="{ 'is-loading': loading }"
                class="button is-primary is-fullwidth"
                :disabled="loading"
                @click="search"
            >Search</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Packlist from '@/common/packlist';
import logger from '@/common/utils/logger';

@Component
export default class Search extends Vue {
    loading: boolean = false;
    selectedResolution: string = '1080';
    input: string = '';

    get searchText() {
        return this.$store.state.app.searchText;
    }

    get downloadPossible() {
        return this.$store.state.app.selectedEpisodes.length > 0;
    }

    search() {
        this.$store.commit('setSearchText', this.input);
        this.loading = true;

        Packlist.search(
            this.searchText,
            parseInt(this.selectedResolution, 10),
            this.$store.state.config.uniqueEpisodesOnly,
            true
        )
            .then(result => {
                this.loading = false;
                if (!result) {
                    return;
                }

                this.$store.dispatch('setTableData', result);
            })
            .catch(err => {
                logger.error(err);
            });
    }
}
</script>
