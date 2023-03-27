import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Layout, Card, Row, Col, Button } from 'antd';
import PageHeader from '../components/layout/header';
import PageFooter from '../components/layout/footer';
import SignIn from '../components/login-forms/signIn';
import SignUp from '../components/login-forms/signUp';
import { useSession } from 'next-auth/react';

const { Header, Content, Footer } = Layout;

export default function Home() {
  const [loginOption, setLoginOption] = useState('SignIn');
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/chat';
    }
  }, [status, session])

  const optionSelected = (option) => {
    setLoginOption(option)
  }

  return (
    <div>
      <Head>
        <title>Chat It Up!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header>
          <PageHeader home/>
        </Header>
        <Content>
          <div style={{ background: '#ECECEC', padding: '50px 100px 50px 100px' }}>
            <Card bordered={false}>
              <Row>
                <Col 
                  span={12} 
                  className={styles.SignIn}
                  style={{padding: '10px 10px 20px 10px'}}>
                  <Button type='link' onClick={() => optionSelected('SignIn')}>Sign In</Button>
                </Col>
                <Col 
                  span={12} 
                  className={styles.SignUp}
                  style={{padding: '10px 10px 20px 10px'}}>
                  <Button type='link' onClick={() => optionSelected('SignUp')}>Sign Up</Button>
                </Col>
              </Row>
              <Row>
                <Col xs={2} sm={4} md={4} lg={4} xl={4}>
                </Col>
                <Col xs={20} sm={16} md={16} lg={16} xl={16}>
                  {loginOption === 'SignIn' ? <SignIn /> : <SignUp />}
                </Col>
                <Col xs={2} sm={4} md={4} lg={4} xl={4}>
                </Col>
              </Row>
            </Card>
          </div>
        </Content>
        <Footer>
          <PageFooter />
        </Footer>
      </Layout>
    </div>
  )
}
