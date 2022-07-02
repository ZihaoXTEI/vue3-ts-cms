import { App } from 'vue'
import registerElement from './register-element'
// import registerProperties from './register-properties'

import MyBreadcrumb from '@/base-ui/my-breadcrumb'
import MyForm from '@/base-ui/my-form'
import MyTable from '@/base-ui/my-table'

export function globalRegister(app: App): void {
  app.use(registerElement)
  // app.use(registerProperties)

  app.component(MyForm.name, MyForm)
  app.component(MyTable.name, MyTable)
  app.component(MyBreadcrumb.name, MyBreadcrumb)
}

// export function
