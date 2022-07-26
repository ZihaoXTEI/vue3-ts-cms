import { App } from 'vue'

// 注册全局组件
export const registerBaseUI = (app: App) => {
  const baseuiFiles = require.context('../base-ui', true, /index\.ts/)
  baseuiFiles.keys().forEach((key) => {
    if (key.match(/\/types\//)) {
      return
    }
    const baseui = require('../base-ui' + key.split('.')[1])
    const name = key.split('/')[1]
    app.component(name, baseui.default)
  })
}
