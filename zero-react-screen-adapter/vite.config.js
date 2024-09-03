import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'index.js',  // 组件的入口文件
      name: 'ScreenAdapter',
      fileName: (format) => `zero-react-screen-adapter.${format}.js`
    },
    rollupOptions: {  
      // 确保外部化处理你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDom'
        }
      }
    }
  }
});
