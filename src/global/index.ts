import { App } from 'vue'
import registerElement from './register-element'
// import registerProperties from './register-properties'

// import MyBreadcrumb from '@/base-ui/my-breadcrumb'
// import MyForm from '@/base-ui/my-form'
// import MyTable from '@/base-ui/my-table'
// import MyCard from '@/base-ui/my-card'
// import MyEchart from '@/base-ui/my-echarts'
// import MyCountup from '@/base-ui/my-countup'
// import MyTextlink from '@/base-ui/my-textlink'
// import MyCode from '@/base-ui/my-code'
// import MyEditor from '@/base-ui/my-editor'

import { registerBaseUI } from './register-components'

export function globalRegister(app: App): void {
  app.use(registerElement)
  // app.use(registerProperties)

  // app.component(MyForm.name, MyForm)
  // app.component(MyTable.name, MyTable)
  // app.component(MyBreadcrumb.name, MyBreadcrumb)
  // app.component(MyCard.name, MyCard)
  // // app.component(MyEchart.__name as string, MyEchart)
  // app.component('my-echarts', MyEchart)
  // app.component(MyCountup.name, MyCountup)
  // app.component(MyTextlink.name, MyTextlink)
  // app.component(MyCode.name, MyCode)
  // app.component(MyEditor.name, MyEditor)

  registerBaseUI(app)
}
