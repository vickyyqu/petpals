import { createApp } from 'vue'
import App from './views/App.vue'
import { router } from './router/index'

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

import './css/style.css'

const app = createApp(App).use(router);

app.mount("#app");
