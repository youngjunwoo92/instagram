import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex flex-col max-w-3xl w-full px-2 py-4 mx-auto gap-4">
      <FollowingBar />
      <PostList />
    </section>
  );
}
