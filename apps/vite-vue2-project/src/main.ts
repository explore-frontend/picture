import { createApp, h, Vue2 } from 'vue-demi';

import App from './App.vue';
import router from './router';

Vue2!.config.productionTip = false;

const app = createApp({
    router,
    render: () => h(App),
});

app.mount('#app');
