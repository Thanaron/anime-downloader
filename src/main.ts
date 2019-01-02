import Vue from 'vue';
import Buefy from 'buefy';
import App from '@/App.vue';
import router from '@/common/router';
import store from '@/common/store/store';

import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

Vue.config.productionTip = false;
Vue.use(Buefy, { defaultIconPack: 'fas' });

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');
