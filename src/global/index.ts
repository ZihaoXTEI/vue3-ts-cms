import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'

import MyForm from '@/base-ui/my-form'
import MyTable from '@/base-ui/my-table'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)

  app.component(MyForm.name, MyForm)
  app.component(MyTable.name, MyTable)
}

// export function
