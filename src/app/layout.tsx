import { Open_Sans } from 'next/font/google';

import SWRConfigContext from '@/context/SWRConfigContext';
import LayoutProvider from '@/context/LayoutProvider';
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
        <LayoutProvider>{children}</LayoutProvider>
        <div id="portal" />
      </body>
    </html>
  );
}
