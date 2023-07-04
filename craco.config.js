const { realpathSync } = require('fs')
const path = require('path')

const appDirectory = realpathSync(process.cwd())
const resolveApp = (_path) => path.resolve(appDirectory, _path)

module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001' // Mock服务
    }
  },
  webpack: {
    configure(webpackConfig) {
      // console.log('=========', webpackConfig.mode)
      if (webpackConfig.mode === 'production') {
        // 抽离公共代码，只在生产环境
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 100
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98
            }
          }
        }
      }
      return webpackConfig
    },
    alias: {
      '@': resolveApp('src')
    }
  }
}
