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
    <section className="flex flex-col md:flex-row max-w-[780px] p-4 mx-auto gap-4">
      <div className="w-full basis-3/4 min-w-0 flex flex-col gap-4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <Sidebar user={user} />
      </div>
    </section>
  );
}
