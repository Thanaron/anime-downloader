import { Module, MutationTree, ActionTree, GetterTree } from 'vuex';
import { getField, updateField } from 'vuex-map-fields';
import store from '@/common/config';
import { ConfigState, RootState } from '@/types/types';
import logger from '@/common/utils/logger';

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
    selectedTheme: { name: 'Dark', file: 'Dark.css' },
    logLevel: 'info',
};

const getters: GetterTree<ConfigState, RootState> = {
    getField,
};

const mutations: MutationTree<ConfigState> = {
    updateField,
};

const actions: ActionTree<ConfigState, RootState> = {
    loadCurrentSettings({ commit }) {
        logger.debug('Loading settings..');

        const { config } = store.store;

        Object.entries(config).forEach(([key, value]) => {
            commit('updateField', { path: key, value });
        });
        logger.info('Settings loaded');
    },
    setSettings({ state }) {
        logger.debug('Saving settings..');
        Object.entries(state).forEach(([key, value]) => {
            store.set(`config.${key}`, value);
        });
        logger.info('Settings saved');
    },
};

export const config: Module<ConfigState, RootState> = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
