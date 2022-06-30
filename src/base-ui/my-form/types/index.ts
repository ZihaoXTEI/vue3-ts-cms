type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  /**
   * 绑定属性名
   */
  field: string

  /**
   * 表单组件类型
   */
  type: IFormType

  /**
   * 标签文本
   */
  label: string

  /**
   * 表单验证规则
   */
  rules?: any[]

  /**
   * 占位文本
   */
  placeholder?: string

  /**
   * Select多项数据
   */
  options?: any[]

  /**
   * 其它特殊属性
   */
  otherOptions?: any

  /**
   * 是否隐藏表单组件
   */
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]

  /**
   * 标签文本宽度
   */
  labelWidth?: string

  /**
   * 每行布局
   */
  colLayout?: any

  /**
   * 表单组件样式
   */
  itemStyle?: any
}
