import { Button, Checkbox, Form, Input } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Language from '../../components/base/language/Language'
import Theme from '../../components/base/theme/Theme'
import Translate from '../../components/base/translate/Translate'
import { authenticate } from '../../reducers/slice/authSlice'
import { useAppDispatch } from '../../redux/store'
import styleModule from './style.module.scss'
import path from '../../mocks/Path.json'
type Props = {}

const Login = ({}: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectRouter = searchParams.get('return') || path.home.url

  const onFinish = async (values: any) => {
    await dispatch(authenticate(values))
    navigate(redirectRouter)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={styleModule.login}>
      <Language />
      <Theme />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<Translate contentKey="login.username" />}
          name="username"
          rules={[
            { required: true, message: <Translate contentKey="login.requiredMessage.username" /> },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<Translate contentKey="login.password" />}
          name="password"
          rules={[
            { required: true, message: <Translate contentKey="login.requiredMessage.password" /> },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>{<Translate contentKey="login.remember" />}</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            <Translate contentKey="login.login" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
