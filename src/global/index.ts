import { App } from 'vue'
import registerElement from './register-element'

import MyForm from '@/base-ui/my-form'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.component(MyForm.name, MyForm)
}

// export function
