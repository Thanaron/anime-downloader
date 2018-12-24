import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import store from '../../config';
import { ConfigState, RootState } from '@/types/types';

const { getField, updateField } = require('vuex-map-fields');
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
    availableThemes: [],
    selectedTheme: { name: 'light', file: 'light.css' },
};

const getters: GetterTree<ConfigState, RootState> = {
    getField,
};

const mutations: MutationTree<ConfigState> = {
    updateField,
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
    getters,
    mutations,
    actions,
};
