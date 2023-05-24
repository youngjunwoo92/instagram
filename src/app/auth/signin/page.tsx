import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import Signin from '@/components/Signin';
import Header from '@/components/Header';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Signup or Login to Woostagram',
};

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="fixed inset-0">
      <div className="relative w-full h-full">
        <Signin providers={providers} />
      </div>
    </section>
  );
}
