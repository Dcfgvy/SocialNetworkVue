import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies';

loadFonts()
/* eslint-disable */

const app = createApp(App)
app.config.globalProperties.axios = axios;
app.use(VueCookies);

app.use(router)
  .use(vuetify)
  .mount('#app');
