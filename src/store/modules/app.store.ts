import { MutationTree, ActionTree, Module } from 'vuex';
import { ApplicationState, HSRelease, RootState } from '@/types/types';

const state: ApplicationState = {
    searchText: '',
    tableData: [] as HSRelease[],
    selectedEpisodes: [] as HSRelease[],
};

const mutations: MutationTree<ApplicationState> = {
    setTableData(state: any, data: HSRelease[]) {
        state.tableData = data;
    },
    setSearchText(state: ApplicationState, searchText: string) {
        state.searchText = searchText;
    },
    setSelectedEpisodes(state: ApplicationState, episodes: HSRelease[]) {
        state.selectedEpisodes = episodes;
    },
    addSelectedEpisode(state: ApplicationState, episode: HSRelease) {
        if (!state.selectedEpisodes.includes(episode)) {
            state.selectedEpisodes.push(episode);
        }
    },
    removeSelectedEpisode(state: ApplicationState, episode: HSRelease) {
        if (state.selectedEpisodes.includes(episode)) {
            const index = state.selectedEpisodes.indexOf(episode);
            state.selectedEpisodes.splice(index, 1);
        }
    },
};

const actions: ActionTree<ApplicationState, RootState> = {
    setTableData({ commit }, data: HSRelease[]) {
        commit('setTableData', data);
    },
    setSelectedEpisodes({ commit }, episodes: HSRelease[]) {
        commit('setSelectedEpisodes', episodes);
    },
};

export const app: Module<ApplicationState, RootState> = {
    state,
    mutations,
    actions,
};
