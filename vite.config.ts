import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default ({ command }) => {
  // 这个会在vscode的终端打印出来,获取当前运行的环境
  console.log(command, 'command')
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue'], // 需要引入的来源
        eslintrc: {
          enabled: true, // 使用 eslint 配置
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      ElementPlus({}),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/variable.scss";',
        },
      },
    },
  }
}
