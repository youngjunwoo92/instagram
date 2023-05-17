import GoogleProvider from 'next-auth/providers/google';
import NextAuth, { NextAuthOptions, Session } from 'next-auth';

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
      if (!email) {
        return false;
      }

      addUser({
        id,
        name: name || '',
        image,
        email,
        username: email.split('@')[0],
      });

      return true;
    },
    async session({ session, token }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          username: user.email?.split('@')[0] || '',
          id: token.id as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: 'instagram-secret',
};

export default NextAuth(authOptions);
