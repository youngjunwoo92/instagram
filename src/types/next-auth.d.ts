declare module 'next-auth' {
  interface Session {
    user: User;
  }
}
