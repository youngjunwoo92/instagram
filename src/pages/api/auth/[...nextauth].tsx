import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { NextAuthOptions } from 'next-auth';

import { addUser } from '@/service/user';

const clientId = process.env.GOOGLE_CLIENT_ID;
const secretId = process.env.GOOGLE_SECRET_ID;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: clientId ?? '',
      clientSecret: secretId ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, name, image } }) {
      if (!email) return false;

      addUser({
        id,
        email,
        name: name ?? '',
        image,
        username: email.split('@')[0],
      });
      return true;
    },
    async session({ session }) {
      console.log({ session });
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);
