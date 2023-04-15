import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const clientId = process.env.GOOGLE_CLIENT_ID;
const secretId = process.env.GOOGLE_SECRET_ID;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: clientId ?? '',
      clientSecret: secretId ?? '',
    }),
  ],
};

export default NextAuth(authOptions);
