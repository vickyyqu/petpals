import { createApp } from 'vue'
import App from './views/App.vue'
import { router } from './router/index'

import 'vueperslides/dist/vueperslides.css'


import './css/style.css'

const app = createApp(App).use(router);
app.mount("#app");
