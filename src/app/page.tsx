import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
import Sidebar from '@/components/Sidebar';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section>
      <FollowingBar />
      <PostList />
      <Sidebar user={user} />
    </section>
  );
}
