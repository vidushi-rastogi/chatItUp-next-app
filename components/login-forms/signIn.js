import { Form, Input, Button, Card } from 'antd';
import Link from 'next/link';
import styles from './loginForm.module.css';

export default function SignIn() {
  return <Card bordered={false} className={styles.loginForm}>
    <h4>Welcome back!</h4>
    <Form
      name="basic"
      initialValues={{ remember: true }}
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
        <Link href='/chat'>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Link>
      </Form.Item>
    </Form>
  </Card>
}