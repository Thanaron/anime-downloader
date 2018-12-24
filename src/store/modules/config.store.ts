import Vue from 'vue';
import { Module, MutationTree, ActionTree } from 'vuex';
import store from '../../config';
import { ConfigState, RootState } from '@/types/types';

const state: ConfigState = {
    visibleColumns: {
        bot: false,
        name: true,
        episode: true,
        resolution: true,
        pack: false,
        size: true,
    },
    autoDownload: false,
    autoCheckUpdate: true,
    uniqueEpisodesOnly: true,
    downloadPath: '',
    username: '',
};

const mutations: MutationTree<ConfigState> = {
    set(state: ConfigState, data: any) {
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
