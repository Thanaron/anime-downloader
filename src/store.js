import Vue from 'vue';
import Vuex from 'vuex';

import store from './config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        visibleColumns: [],
        autoDownload: false,
        autoCheckUpdate: true,
        uniqueEpisodesOnly: true,
        downloadPath: '',
        username: '',
    },
    mutations: {
        set(state, data) {
            Vue.set(state, data.key, data.value);
        },
    },
    actions: {
        loadCurrentSettings({ commit }) {
            const { config } = store.store;

            Object.entries(config).forEach(([key, value]) => {
                commit('set', { key, value });
            });
        },
        set({ commit }, data) {
            commit('set', data);
            store.set(`config.${data.key}`, data.value);
        },
    },
});
