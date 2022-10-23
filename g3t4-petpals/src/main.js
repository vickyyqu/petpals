import { createApp } from 'vue'
import App from './views/App.vue'
import { router } from './router/index'
import VueAnimXyz from '@animxyz/vue3'
import '@animxyz/core' 

import './css/style.css'

const app = createApp(App).use(router).use(VueAnimXyz);

app.mount("#app");
