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
            commit('set', {
                key: 'visibleColumns',
                value: config.visibleColumns,
            });
            commit('set', {
                key: 'autoDownload',
                value: config.autoDownload,
            });
            commit('set', {
                key: 'autoCheckUpdate',
                value: config.autoCheckUpdate,
            });
            commit('set', {
                key: 'uniqueEpisodesOnly',
                value: config.uniqueEpisodesOnly,
            });
            commit('set', {
                key: 'downloadPath',
                value: config.downloadPath,
            });
        },
        set({ commit }, data) {
            commit('set', data);
            store.set(`config.${data.key}`, data.value);
        },
    },
});
