import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import FollowingBar from '@/components/FollowingBar';
import PostList from '@/components/PostList';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex flex-col max-w-xl w-full px-2 py-4 mx-auto gap-4">
      <FollowingBar />
      <PostList />
    </section>
  );
}
