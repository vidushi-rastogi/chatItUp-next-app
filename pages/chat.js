import { Layout, Result } from 'antd';
import { useSession } from 'next-auth/react';
import { ChatNotifications } from '../db/sampleChatNotifications';
import PageHeader from '../components/layout/header';
import PageSider from '../components/chat-room/sider';
import ChatLog from '../components/chat-room/chatWindow';
import ChatInput from '../components/chat-room/chatInput';
import { useEffect, useState } from 'react';

const { Header, Sider, Content } = Layout;

export const getStaticProps = async () => {
  return {
    props: {
      chatNotifications: ChatNotifications,
    }
  }
}

export default function Chat({ chatNotifications }) {
  const [currentActiveChat, setCurrentActiveChat] = useState('');
  const [chatPartners, setChatPartners] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const { data: session, status } = useSession();
  useEffect(() => {
    // if (localStorage) {
      const currentUserDetails = JSON.parse(localStorage.getItem('userDetails'))
      setChatPartners(currentUserDetails.chatPartners);
    // }
    if (session) { 
      const getUserChats = async () => {
        await fetch(`/api/getUserChats?username=${session.user.username}`, {
          method: 'GET'
        })
        .then(async (res) => {
          const userChatsResponse = await res.json();
          setUserChats(userChatsResponse.chats)
        })
      }
      getUserChats();
    }
  }, [status, session])
  
  return status === 'authenticated' ? <Layout>
    <Header>
      <PageHeader 
        chatNotifications={chatNotifications} 
        session={session}
        chatPartners={chatPartners}
        setChatPartners={setChatPartners}/>
    </Header>
    <Layout>
      <Content style={{ maxWidth: '75%', maxHeight: '500px' }}>
        <ChatLog
          userChats={userChats}
          session={session}
          currentActiveChat={currentActiveChat}
        />
        {currentActiveChat !== '' ? 
          <ChatInput
            session={session}
            currentActiveChat={currentActiveChat}
            userChats={userChats}
            setUserChats={setUserChats}/> 
          : <></>}
      </Content>
      <Sider>
        <PageSider
          setCurrentActiveChat={setCurrentActiveChat}
          chatPartners={chatPartners}
        />
      </Sider>
    </Layout>
  </Layout>
    :
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
}