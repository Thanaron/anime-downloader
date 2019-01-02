import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main.vue';
import Home from '@/views/main/Home.vue';
import Settings from '@/views/main/Settings.vue';
import Download from '@/views/main/Download.vue';

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
    ],
});
