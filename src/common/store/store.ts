import Vue from 'vue';
import Vuex from 'vuex';
import { app } from './modules/app.store';
import { config } from './modules/config.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        config,
    },
});
