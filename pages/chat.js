import { Layout } from 'antd';
import { ChatUsers } from '../db/sampleChatUsers';
import { ChatNotifications } from '../db/sampleChatNotifications';
import { ChatLogs } from '../db/sampleChatLog';
import PageHeader from '../components/layout/header';
import PageSider from '../components/chat-room/sider';
import ChatLog from '../components/chat-room/chatWindow';
import ChatInput from '../components/chat-room/chatInput';
import { useState } from 'react';

const { Header, Sider, Content } = Layout;

export const getStaticProps = async () => {
    return {
        props: {
            chatUsers: ChatUsers,
            chatNotifications: ChatNotifications,
            chatLogs: ChatLogs
        }
    }
}

export default function Chat({chatUsers, chatNotifications, chatLogs}) {
  const [currentActiveChat, setCurrentActiveChat] = useState('');

    return <Layout>
    <Header><PageHeader chatNotifications={chatNotifications}/></Header>
    <Layout>
      <Content style={{maxWidth: '75%', maxHeight: '500px'}}>
        <ChatLog 
          chatLogs={chatLogs} 
          currentActiveChat={currentActiveChat}  
        />
        {currentActiveChat !== '' ? <ChatInput currentActiveChat={currentActiveChat}/> : <></>}
      </Content>
      <Sider>
        <PageSider 
          chatUsers={chatUsers}
          setCurrentActiveChat={setCurrentActiveChat}
          />
      </Sider>
    </Layout>
  </Layout>
}