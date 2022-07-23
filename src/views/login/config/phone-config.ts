import { FormRules } from 'element-plus'
const phoneRules: FormRules = {
  num: [
    {
      required: true,
      message: '手机号码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
      message: '手机号码格式错误',
      trigger: 'blur'
    }
  ]
}

export { phoneRules }
