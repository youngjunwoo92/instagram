'use client';
import React, { useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

type MenuItem = {
  label: string;
  icon?: React.ReactNode | undefined;
  onClick: () => void;
};

type Props = {
  onClose: () => void;
  menuItems: MenuItem[];
};

function DropdownItem({
  icon,
  onClick,
  children,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode | undefined;
  onClick: () => void;
}) {
  return (
    <div className="menu-item-container first:border-b" onClick={onClick}>
      <div className="px-4 py-2 font-semibold flex gap-2 items-center">
        {icon}
        <p>{children}</p>
      </div>
    </div>
  );
}

export default function Menu({ menuItems, onClose }: Props) {
  const ref = useClickOutside(onClose);
  return (
    <div ref={ref} className="menu">
      {menuItems.map(({ icon, onClick, label }, index) => (
        <DropdownItem key={index} icon={icon} onClick={onClick}>
          {label}
        </DropdownItem>
      ))}
    </div>
  );
}
