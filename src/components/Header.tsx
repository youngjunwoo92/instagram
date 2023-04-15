'use client';
import React from 'react';

import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import UploadActiveIcon from './ui/icons/UploadActiveIcon';
import SearchActiveIcon from './ui/icons/SearchActiveIcon';
import HomeActiveIcon from './ui/icons/HomeActiveIcon';
import GradientButton from './ui/GradientButton';
import SearchIcon from './ui/icons/SearchIcon';
import UploadIcon from './ui/icons/UploadIcon';
import HomeIcon from './ui/icons/HomeIcon';

const menus = [
  { href: '/', icon: <HomeIcon />, activeIcon: <HomeActiveIcon /> },
  { href: '/search', icon: <SearchIcon />, activeIcon: <SearchActiveIcon /> },
  { href: '/upload', icon: <UploadIcon />, activeIcon: <UploadActiveIcon /> },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 h-20 shadow-md">
      <div className="mx-auto p-2 flex justify-between max-w-lg w-full h-full items-center">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">Instagram</h1>
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-4">
            {menus.map((menu, index) => (
              <li key={index}>
                <Link href={menu.href}>
                  {menu.href === pathname ? menu.activeIcon : menu.icon}
                </Link>
              </li>
            ))}
            <GradientButton
              text={session ? 'Sign Out' : 'Sign In'}
              onClick={session ? signOut : signIn}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}
