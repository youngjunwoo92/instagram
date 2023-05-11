import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { getUserForProfile } from '@/service/user';

type Props = { params: { username: string } };

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);
  const session = await getServerSession(authOptions);
  const loggedInUser = session?.user;

  if (!user) {
    notFound();
  }

  return (
    <section className="max-w-xl w-full flex flex-col px-2 pt-6">
      <UserProfile user={user} />
      <UserPosts user={user} loggedInUser={loggedInUser} />
    </section>
  );
}
