import Vue from 'vue';
import Vuex from 'vuex';

import store from './config';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        visibleColumns: ['bot', 'name', 'episode', 'resolution'],
        autoDownload: false,
        autoCheckUpdate: true,
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
    },
    actions: {},
});
