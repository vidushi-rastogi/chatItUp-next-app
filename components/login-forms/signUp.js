import { Form, Input, Button, Card, notification } from 'antd';
import styles from './loginForm.module.css';

export default function SignUp() {

  const popNotification = (type, error) => {
    notification[type]({
      message: error ?? 'Welcome to your chat room!',
      description: error ? 'Your account validation has failed please check the credentials you have input' : 'You are successfully logged in, let\'s chat it up!'
    })
  }

  const handleSubmit = async (values) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username: values.username,
        password: values.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const status = await res.status;
    if (status === 200) {
      popNotification('success', null);
      window.location.href = '/chat';
    }
    else {
      popNotification('error', 'Something went wrong while registering your account :(')
    }
  }

  return <Card bordered={false} className={styles.loginForm}>
    <h4>Let's get started!</h4>
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  </Card>
}