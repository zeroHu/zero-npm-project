import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'index.js',  // 组件的入口文件
      name: 'ScreenAdapter',
      fileName: (format) => `zero-vue-screen-adapter.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理你不想打包进库的依赖
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
