'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import GradientButton from './ui/GradientButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function Signin({ providers }: Props) {
  return (
    <div className="position-center max-w-[350px] w-full p-8 flex flex-col items-center justify-center border-0 sm:border-2">
      <h1 className="text-3xl font-[cursive] font-bold">Woostagram</h1>
      <div className="w-full mt-4">
        {Object.values(providers).map(({ name, id }) => (
          <GradientButton
            key={id}
            text={`Sign in with ${name}`}
            onClick={() => signIn(id)}
            fullWidth
          />
        ))}
      </div>
    </div>
  );
}
