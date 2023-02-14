import { Form, Input, Button, Card, notification } from 'antd';
import styles from './loginForm.module.css';
import { signIn, useSession } from 'next-auth/react';

export default function SignIn() {

  const popNotification = (type, error) => {
    notification[type]({
      message: error ?? 'Welcome to your chat room!',
      description: error ? 'Your account validation has failed please check the credentials you have input' : 'You are successfully logged in, let\'s chat it up!'
    })
  }

  const handleSubmit = async (values) => {
    const res = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false
    })
    if(res.error) {
      popNotification('error', res.error);
    }
    else {
      popNotification('success', null);
      window.location.href = '/chat';
    }
  }


  return <Card bordered={false} className={styles.loginForm}>
    <h4>Welcome back!</h4>
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
          Sign In
        </Button>
      </Form.Item>
    </Form>
  </Card>
}