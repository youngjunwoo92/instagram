import { Open_Sans } from 'next/font/google';

import SWRConfigContext from '@/context/SWRConfigContext';
import AuthContext from '@/context/AuthContext';
import Header from '@/components/Header';

import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Woostagram',
    template: 'Woostagram | %s',
  },
  description: 'Woostagram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="relative">
        <AuthContext>
          <Header />
          <main className="w-full  flex justify-center bg-neutral-50 min-h-full">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
