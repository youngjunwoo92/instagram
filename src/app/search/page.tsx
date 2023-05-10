import UserSearch from '@/components/UserSearch';
import React from 'react';

export default function SearchPage() {
  return (
    <section className="flex flex-col max-w-xl w-full px-2 py-4 mx-auto gap-4">
      <UserSearch />
    </section>
  );
}
