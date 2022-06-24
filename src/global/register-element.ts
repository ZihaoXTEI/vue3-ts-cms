import { App } from 'vue'
// import 'element-plus/theme-chalk/index.css'
import 'element-plus/dist/index.css'
import {
  ElAside,
  ElButton,
  ElCheckbox,
  ElContainer,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElLink,
  ElMenu,
  ElMenuItem,
  ElRadio,
  ElMain,
  ElSubMenu,
  ElTabPane,
  ElTabs,
  ElMenuItemGroup
} from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,
  ElIcon,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu
]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
  // for (const [key, component] of Object.entries(components)) {
  //   app.component(key, component)
  // }

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
