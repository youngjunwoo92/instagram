import { Metadata } from 'next';

import UserSearch from '@/components/UserSearch';

export const metadata: Metadata = {
  title: 'Search User',
  description: 'Search users to follow',
};

export default function SearchPage() {
  return (
    <section className="flex flex-col max-w-xl w-full px-2 py-4 mx-auto gap-4">
      <UserSearch />
    </section>
  );
}
