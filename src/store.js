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
        downloadPath(state) {
            return state.downloadPath;
        },
    },
    mutations: {
        setVisibleColumns(state, visibleColumns) {
            Vue.set(state, 'visibleColumns', visibleColumns);
        },
        setAutoDownload(state, value) {
            Vue.set(state, 'autoDownload', value);
        },
        setAutoCheckUpdate(state, value) {
            Vue.set(state, 'autoCheckUpdate', value);
        },
        setUniqueEpisodesOnly(state, value) {
            Vue.set(state, 'uniqueEpisodesOnly', value);
        },
        setDownloadPath(state, path) {
            Vue.set(state, 'downloadPath', path);
        },
    },
    actions: {
        loadCurrentSettings({ commit }) {
            commit('setVisibleColumns', store.get('config.visibleColumns'));
            commit('setAutoDownload', store.get('config.autoDownload'));
            commit('setAutoCheckUpdate', store.get('config.autoCheckUpdate'));
            commit('setUniqueEpisodesOnly', store.get('config.uniqueEpisodesOnly'));
            commit('setDownloadPath', store.get('config.downloadPath'));
        },
        setVisibleColumns({ commit }, visibleColumns) {
            commit('setVisibleColumns', visibleColumns);
            store.set('config.visibleColumns', visibleColumns);
        },
        setAutoDownload({ commit }, value) {
            commit('setAutoDownload', value);
            store.set('config.autoDownload', value);
        },
        setAutoCheckUpdate({ commit }, value) {
            commit('setAutoCheckUpdate', value);
            store.set('config.autoCheckUpdate', value);
        },
        setUniqueEpisodesOnly({ commit }, value) {
            commit('setUniqueEpisodesOnly', value);
            store.set('config.uniqueEpisodesOnly', value);
        },
        setDownloadPath({ commit }, path) {
            commit('setDownloadPath', path);
            store.set('config.downloadPath', path);
        },
    },
});
