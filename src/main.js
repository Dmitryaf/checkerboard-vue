import { createApp } from 'vue';

import App from '@/components/App.vue';

import { loadFonts } from './plugins/webfontloader';

import './styles/index.scss';
import 'swiper/swiper-bundle.css';

loadFonts();

createApp(App).use().mount('#app');
