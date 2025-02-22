import React from 'react';
import Link from 'next/link';
import ConnectWallet from '../molecules/ConnectWallet';

const NavBar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-borderGray" aria-label="Main Navigation">
      <div className="flex items-center space-x-4">
        <Link href="/home" className="text-xl font-bold hover:text-primaryPurple" aria-label="Home">un</Link>
        <nav className="hidden md:flex space-x-6" aria-label="Primary Navigation">
          <Link href="/swap" className="hover:text-primaryPurple" aria-label="Swap">Swap</Link>
          <Link href="/wallet" className="hover:text-primaryPurple" aria-label="Wallet">Wallet</Link>
          <Link href="/activity" className="hover:text-primaryPurple" aria-label="Transaction History">Transaction History</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <ConnectWallet aria-label="Connect Wallet" />
        <button className="p-2 rounded-full bg-cardBg hover:bg-borderGray" aria-label="Toggle Dark Mode">
          🌙
        </button>
      </div>
    </header>
  );
};

export default NavBar;
