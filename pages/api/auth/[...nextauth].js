import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../lib/mongodb";
import User from "../../../model/userSchema";

const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const {username, password} = credentials;
                try {
                    connect();
                }
                catch (error) {
                    console.log('ERROR: Something went wrong while connecting with the database', error)
                }
                const user = await User.findOne({username});
                if (!user) {
                    throw new Error(`User ${username} not found!`);
                }
                if (user && password !== user.password) {
                    throw new Error('You have entered invalid password');
                }
                return Promise.resolve(user);
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    }
}

export default NextAuth(authOptions);
