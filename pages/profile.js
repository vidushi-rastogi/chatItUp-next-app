import React from "react";
import { Card, Layout, Result } from 'antd';
import PageHeader from '../components/layout/header';
import ProfileInfo from "../components/profile/profileInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import BackToHome from "../components/shared-components/backToHome";

const { Header } = Layout;

export default function Profile() {
    const { data: session, status } = useSession();
    const { query } = useRouter();

    return (status === 'authenticated' ?
        <>
            {Object.keys(query).length > 0 ?
                <Layout>
                    <Header>
                        <PageHeader
                            session={session} />
                    </Header>
                    <div className='flex justify-start p-3'>
                        <BackToHome />
                    </div>
                    <div className='pt-0 pr-3 pb-0 pl-3 text-center'>
                        <Card>
                            <div className="container my-4 h-screen">
                                <ProfileInfo
                                    session={session}
                                    profileUser={query.user} />
                            </div>
                        </Card>
                    </div>
                </Layout>
                :
                <Result
                    status='404'
                    title='404'
                    subTitle='Requested page not found.'
                />
            }
        </>
        :
        <Result
            status='403'
            title='403'
            subTitle='Sorry, you are not authorized to access this page.'
        />
    )
}
