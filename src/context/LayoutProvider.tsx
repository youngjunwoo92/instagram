'use client';
import { usePathname } from 'next/navigation';

import SWRConfigContext from './SWRConfigContext';
import AuthContext from './AuthContext';
import Header from '@/components/Header';

type Props = { children: React.ReactNode };

export default function LayoutProvider({ children }: Props) {
  const pathname = usePathname();

  return (
    <AuthContext>
      <SWRConfigContext>
        {pathname === '/auth/signin' ? null : <Header />}
        <main>{children}</main>
      </SWRConfigContext>
    </AuthContext>
  );
}
