const { realpathSync } = require('fs')
const path = require('path')

const appDirectory = realpathSync(process.cwd())
const resolveApp = (_path) => path.resolve(appDirectory, _path)

console.log(resolveApp('src'))
module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/api': 'http://localhost:3001' // Mock服务
    }
  },
  webpack: {
    alias: {
      '@': resolveApp('src')
    }
  }
}
