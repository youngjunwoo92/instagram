'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import GradientButton from './ui/GradientButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function Signin({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <GradientButton
          key={id}
          text={`Sign in with ${name}`}
          onClick={() => signIn(id)}
          fullWidth
        />
      ))}
    </>
  );
}
