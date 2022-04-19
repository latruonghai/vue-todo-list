import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
// import component from './env';
import Button from './components/Button.vue';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia).mount('#app');
app.component('my-button', Button);
