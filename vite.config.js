import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages 部署配置
// 部署到 https://lone-beast.github.io/tech-evaluation-h5/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0', // 允许局域网访问
    port: 3000,
    open: true
  },
  // 重要：GitHub Pages 需要设置正确的 base 路径
  base: '/tech-evaluation-h5/',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  }
})
