export interface IColumnData {
  /**
   * 字段属性名称
   */
  prop: string
  /**
   * 列名
   */
  label: string
  /**
   * 列最小宽度
   */
  minWidth?: string
  /**
   * 自定义插槽名称
   */
  slotName?: string
  // { prop: 'name', label: '用户名', minWidth: '100' },
}
