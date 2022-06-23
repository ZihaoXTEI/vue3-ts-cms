// 账户登录验证规则
export const rules = {
  name: [
    {
      required: true,
      message: '请输入账户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,10}$/,
      message: '账户名必须是6~10位数字或者字母',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{6,}$/,
      message: '密码必须是6位以上字符',
      trigger: 'blur'
    }
  ]
}
