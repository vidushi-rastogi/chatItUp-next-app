import { Form, Input, Button, Card } from 'antd';
import Link from 'next/link';
import styles from './loginForm.module.css';

export default function SignUp() {
  return <Card bordered={false} className={styles.loginForm}>
    <h4>Let's get started!</h4>
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
            Sign Up
          </Button>
        </Link>
      </Form.Item>
    </Form>
  </Card>
}