import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken';
import { LockFilled, MailFilled, PhoneFilled } from "@ant-design/icons";
import '../components/DemoLogin/DemoLogin.scss';
import Logo from '../components/HeaderDemo/logodemo.png';
import { authenticate } from "../reducers/slice/authSlice";
import { useAppDispatch } from "../redux/store";

type Props = {}

const DemoLogin = ({ }: Props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onFinish = async (values: any) => {
    const { payload } = await dispatch(authenticate({
      userName: values.username,
      password: values.password,
      rememberMe: true
    }))
    console.log(payload, navigate);
    if (payload.status === 1) {
      localStorage.setItem("token", payload.data.jwtToken)
      navigate("/")
    } else {
      const errorMessage = document.getElementById('error-message')
      const eMessage = document.createElement('div')
      eMessage.classList.add('error-message')
      eMessage.innerHTML = `
      <div class='error-icon'>x</div>
      <div>Wrong username or password</div>
      `
      errorMessage?.appendChild(eMessage)
      setTimeout(() => {
        errorMessage?.removeChild(eMessage)
      }, 3000)
      console.log("LO FAILSE");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);

    // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    // console.log(token)
    // var decoded = jwt.verify(token, 'shhhhh');
    // console.log(decoded.foo)
  };

  return (
    <div className="login-page">
      <div id="error-message" />
      <Form
        className="login-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <img className="login-logo" src={Logo} alt="logo" />
        <div className="login-name">VRPACS</div>

        <Form.Item
          className="login-form-item"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input className="login-input" prefix={<MailFilled />} placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          className="login-form-item"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className="login-input" prefix={<LockFilled />} placeholder="Enter password" />
        </Form.Item>

        <Form.Item className="login-form-item" wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="login-button" type="primary" htmlType="submit">
            LOGIN
          </Button>
        </Form.Item>

        <div className="login-forgot">
          <span className="login-forgot-text">Forgot</span>
          <a className="login-forgot-link" href="">Username/ Password?</a>
        </div>

        <div className="login-contact">
          <span className="login-support">
            <PhoneFilled className="contact-icon" />
            <span className="contact-text">Support:</span>
          </span>
          <span className="login-phone">096.873.6995 - Ngô Văn Sơn</span>
        </div>
      </Form>
    </div>
  );
};

export default DemoLogin;
