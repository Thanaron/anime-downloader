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
    },
    getters: {
        visibleColumns(state) {
            return state.visibleColumns;
        },
        autoDownload(state) {
            return state.autoDownload;
        },
        autoCheckUpdate(state) {
            return state.autoCheckUpdate;
        },
        uniqueEpisodesOnly(state) {
            return state.uniqueEpisodesOnly;
        },
    },
    mutations: {
        setVisibleColumns(state, visibleColumns) {
            Vue.set(state, 'visibleColumns', visibleColumns);
            store.set('config.visibleColumns', visibleColumns);
        },
        setAutoDownload(state, value) {
            Vue.set(state, 'autoDownload', value);
            store.set('config.autoDownload', value);
        },
        setAutoCheckUpdate(state, value) {
            Vue.set(state, 'autoCheckUpdate', value);
            store.set('config.autoCheckUpdate', value);
        },
        setUniqueEpisodesOnly(state, value) {
            Vue.set(state, 'uniqueEpisodesOnly', value);
            store.set('config.uniqueEpisodesOnly', value);
        },
    },
    actions: {
        loadCurrentSettings({ commit }) {
            commit('setVisibleColumns', store.get('config.visibleColumns'));
            commit('setAutoDownload', store.get('config.autoDownload'));
            commit('setAutoCheckUpdate', store.get('config.autoCheckUpdate'));
            commit('setUniqueEpisodesOnly', store.get('config.uniqueEpisodesOnly'));
        },
    },
});
