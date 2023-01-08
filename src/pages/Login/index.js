import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import logo from '@/assets/logo2.jpg'
import { useNavigate } from 'react-router-dom'
//import scss file
import './index.scss'
import { useStore } from '@/store'
function Login () {
  const { loginStore } = useStore()
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log('Success:', values)
    // todo: login
    const { mobile, code } = values
    try {
      await loginStore.getTokens({ mobile, code })
      //jump page
      navigate('/', { replace: true })
      //message 
      message.success('login success!')
    } catch (e) {
      message.error(e.response?.data.message || "login failed!")
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          initialValues={{
            remember: true,
            mobile: '13811111111',
            code: '246810'
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
              {
                pattern: /\d{10}/,
                message: "please input 10 digit phone number",
                validateTrigger: 'onBlur'
              }
            ]}
          >
            <Input size="large" placeholder="phone number(13811111111)" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input your verification code!',
              },
              {
                len: 6,
                message: "please in put 6 characters verification code!",
                validateTrigger: 'onBlur'
              }

            ]}
          >
            <Input size="large" placeholder="verification code(246810)" />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              {/* 我已阅读并同意「用户协议」和「隐私条款」 */}
              Remember me
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login