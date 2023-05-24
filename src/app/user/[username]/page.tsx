import { notFound } from 'next/navigation';

import { Metadata } from 'next';
import { cache } from 'react';

import UserProfile from '@/components/UserProfile';
import UserPosts from '@/components/UserPosts';

import { getUserForProfile } from '@/service/user';

type Props = { params: { username: string } };

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="max-w-3xl w-full flex flex-col px-2 pt-6 mx-auto">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) · Woostagram Photos`,
    description: `${user?.name}'s all Woostagram posts`,
  };
}
