'use client';
import { useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import SearchActiveIcon from './ui/icons/SearchActiveIcon';
import HomeActiveIcon from './ui/icons/HomeActiveIcon';
import GradientButton from './ui/GradientButton';
import SearchIcon from './ui/icons/SearchIcon';
import UploadIcon from './ui/icons/UploadIcon';
import HomeIcon from './ui/icons/HomeIcon';
import ModalPortal from './ModalPortal';
import UploadModal from './UploadModal';
import Avatar from './ui/Avatar';
import Upload from './Upload';
import Menu from './ui/Menu';

import AccountIcon from './ui/icons/AccountIcon';
import LogoutIcon from './ui/icons/LogoutIcon';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const anchorElement = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const menuItems = [
    {
      label: 'Profile',
      icon: <AccountIcon />,
      onClick: user ? () => router.push(`/user/${user.username}`) : () => {},
    },
    { label: 'Logout', icon: <LogoutIcon />, onClick: () => signOut() },
  ];

  return (
    <header className="sticky bg-white top-0 h-20 shadow-md z-10">
      <div className="mx-auto p-2 flex justify-between max-w-3xl w-full h-full items-center">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">Woostagram</h1>
          </Link>
        </div>
        <nav>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">
                {pathname === '/' ? <HomeActiveIcon /> : <HomeIcon />}
              </Link>
            </li>
            <li>
              <Link href="/search">
                {pathname === '/' ? <SearchActiveIcon /> : <SearchIcon />}
              </Link>
            </li>
            <li>
              <button
                className="flex justify-center items-center"
                onClick={() => setIsOpen(true)}
              >
                <UploadIcon />
              </button>
            </li>

            {user && (
              <>
                <li className="relative">
                  <button
                    className="flex justify-center items-center"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <Avatar image={user.image} highlight={true} />
                  </button>
                  {isMenuOpen && (
                    <Menu
                      onClose={() => setIsMenuOpen(false)}
                      menuItems={menuItems}
                    />
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      {isOpen && (
        <ModalPortal>
          <UploadModal onClose={() => setIsOpen(false)}>
            <Upload />
          </UploadModal>
        </ModalPortal>
      )}
    </header>
  );
}
