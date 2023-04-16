import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import Signin from '@/components/Signin';

import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default async function SigninPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section>
      <div className="max-w-lg w-full mx-auto mt-5">
        <Signin providers={providers} />
      </div>
    </section>
  );
}
