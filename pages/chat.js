import { Layout, Result, FloatButton } from 'antd';
import { useSession } from 'next-auth/react';
import PageHeader from '../components/layout/header';
import PageSider from '../components/chat-room/sider';
import ChatLog from '../components/chat-room/chatWindow';
import ChatInput from '../components/chat-room/chatInput';
import Refresh from '../components/shared-components/refresh';
import { useEffect, useState } from 'react';

const { Header, Sider, Content } = Layout;

export default function Chat() {
  const [currentActiveChat, setCurrentActiveChat] = useState('');
  const [chatPartners, setChatPartners] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [userNotifications, setUserNotifications] = useState({});
  const [flag, setFlag] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      if (session) {
        const storeUserDetails = async () => {
          await fetch(`/api/getUserDetails?username=${session.user.username}`, {
            method: 'GET'
          })
          .then(async (res) => {
            const userDetailsResponse = await res.json();
            localStorage.setItem('userDetails', JSON.stringify(userDetailsResponse.user));
            setChatPartners(userDetailsResponse.user.chatPartners);
          })
          .catch(error => console.log('ERROR: While retrieving user details : ', error))
        }
        const getUserChats = async () => {
          await fetch(`/api/getUserChats?username=${session.user.username}`, {
            method: 'GET'
          })
            .then(async (res) => {
              const userChatsResponse = await res.json();
              setUserChats(userChatsResponse.chats);

              await fetch(`/api/getAllNotifications?username=${session.user.username}`, {
                method: 'GET'
              })
              .then(async(res) => {
                const userNotificationsResponse = await res.json();
                setUserNotifications(userNotificationsResponse.notifications);
              })
            })
        }
        storeUserDetails();
        getUserChats();
      }
    }
  }, [status, flag, session])

  return status === 'authenticated' ? <Layout>
    <Header>
      <PageHeader
        session={session}
        chatPartners={chatPartners}
        setChatPartners={setChatPartners}
        userNotifications={userNotifications}
        setUserNotifications={setUserNotifications} />
    </Header>
    <Layout>
      <Content style={{ maxWidth: '75%', maxHeight: '500px' }}>
        <FloatButton icon={<Refresh flag={flag} setFlag={setFlag} />}/>
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
            setUserChats={setUserChats} />
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
      status='403'
      title='403'
      subTitle='Sorry, you are not authorized to access this page.'
    />
}