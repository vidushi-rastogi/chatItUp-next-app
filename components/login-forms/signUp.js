import { Form, Input, Button, Card, notification, message } from 'antd';
import { signIn } from 'next-auth/react';
import styles from './loginForm.module.css';

export default function SignUp() {

  const popNotification = (type, error) => {
    notification[type]({
      message: error ?? 'Welcome to your chat room!',
      description: error ? 'Your account validation has failed please check the credentials you have entered!' : 'You are successfully logged in, let\'s chat it up!'
    })
  }

  const handleSubmit = async (values) => {
    if (values.username.includes('_') || values.username.includes(' ')) {
      message.error('Username can not contain \'_\' or spaces');
    }
    else {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          chatPartners: [],
          profileImage: '/default-profile-image.png',
          profileStatus: 'Hey there I am on ChatItUp!'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const status = res.status;
      if (status === 200) {
        const response = await signIn('credentials', {
          username: values.username,
          password: values.password,
          redirect: false
        })
        if(response.error) {
          popNotification('error', response.error);
        }
        else {
          window.location.href = '/chat';
          popNotification('success', null);
        }
      }
      else {
        popNotification('error', 'Something went wrong while registering your account :(')
      }
    }
  }

  return <Card bordered={false} className={styles.loginForm}>
    <h4>Let&apos;s get started!</h4>
    <Form
      name='basic'
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label='Username'
        name='username'
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  </Card>
}