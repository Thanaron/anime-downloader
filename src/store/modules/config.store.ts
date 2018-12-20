import Vue from 'vue';
import { Module, MutationTree, ActionTree } from 'vuex';
import store from '../../config';

const state: ConfigState = {
    visibleColumns: [],
    autoDownload: false,
    autoCheckUpdate: true,
    uniqueEpisodesOnly: true,
    downloadPath: '',
    username: '',
};

const mutations: MutationTree<ConfigState> = {
    set(state: any, data: any) {
        Vue.set(state, data.key, data.value);
    },
};

const actions: ActionTree<ConfigState, RootState> = {
    loadCurrentSettings({ commit }) {
        const { config } = store.store;

        Object.entries(config).forEach(([key, value]) => {
            commit('set', { key, value });
        });
    },
    set({ commit }, data: any) {
        commit('set', data);
        store.set(`config.${data.key}`, data.value);
    },
};

export const config: Module<ConfigState, RootState> = {
    state,
    mutations,
    actions,
};
