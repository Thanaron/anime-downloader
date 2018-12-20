import { MutationTree, ActionTree, Module, GetterTree } from 'vuex';

const state: ApplicationState = {
    status: 'Ready',
    searchText: '',
    tableData: [] as HSRelease[],
    selectedEpisodes: [] as HSRelease[],
};

const mutations: MutationTree<ApplicationState> = {
    setData(state: any, data: HSRelease[]) {
        state.tableData = data;
    },
    setSearchText(state: any, searchText: string) {
        state.searchText = searchText;
    },
    setSelectedEpisodes(state: any, episodes: HSRelease[]) {
        state.selectedEpisodes = episodes;
    },
    addSelectedEpisode(state: any, episode: HSRelease) {
        if (!state.selectedEpisodes.includes(episode)) {
            state.selectedEpisodes.push(episode);
        }
    },
    removeSelectedEpisode(state: any, episode: HSRelease) {
        if (state.selectedEpisodes.includes(episode)) {
            const index = state.selectedEpisodes.indexOf(episode);
            state.selectedEpisodes.splice(index, 1);
        }
    },
};

const actions: ActionTree<ApplicationState, RootState> = {
    setData({ commit }, data: HSRelease[]) {
        commit('setData', data);
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
