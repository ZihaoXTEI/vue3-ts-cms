import { IForm } from '@/base-ui/my-form'

export const searchFormConfig: IForm = {
  labelWidth: '100px',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '类别名称',
      placeholder: '请输入类别名称',
      rules: []
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
