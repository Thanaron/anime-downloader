import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';
import Update from './views/Update.vue';
import Home from './views/Home.vue';
import Settings from './components/Settings.vue';
import Download from './components/Download.vue';

Vue.use(Router);

export default new Router({
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Main,
            children: [
                {
                    path: '',
                    component: Home,
                },
                {
                    path: 'settings',
                    component: Settings,
                },
                {
                    path: 'download',
                    name: 'download',
                    component: Download,
                    props: true,
                },
            ],
        },
        {
            path: '/update',
            name: 'update',
            component: Update,
        },
    ],
});
