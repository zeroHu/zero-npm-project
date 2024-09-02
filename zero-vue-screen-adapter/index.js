import ScreenAdapter from './components/screenAdapter.vue';

export default {
  install(app) {
    app.component('ScreenAdapter', ScreenAdapter);
  },
};

export { ScreenAdapter };
