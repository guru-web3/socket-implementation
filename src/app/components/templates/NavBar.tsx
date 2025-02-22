"use client";
import React from "react";
import Link from "next/link";
import ConnectWallet from "../molecules/ConnectWallet";
import { useState } from "react";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className="flex justify-between items-center px-6 py-4 bg-app-dark-surface3 border-b border-neutral-800 shadow-md"
      aria-label="Main Navigation"
    >
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <Link
          href="/home"
          className="text-xl font-bold text-white flex items-center gap-2"
          aria-label="Home"
        >
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full hover:bg-green-500 bg-red-500"></span>
            un
            <span className="h-3 w-3 rounded-full bg-green-500 hover:bg-red-500"></span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex space-x-6 text-sm font-medium text-gray-400"
          aria-label="Primary Navigation"
        >
          <Link
            href="/home"
            className="hover:text-white transition-colors"
            aria-label="Wrap"
          >
            Wrap
          </Link>
          <Link
            href="/swap"
            className="hover:text-white transition-colors"
            aria-label="swap"
          >
            Swap Bungee
          </Link>
          <Link
            href="/wallet"
            className="hover:text-white transition-colors"
            aria-label="wallet"
          >
            Wallet
          </Link>
          <Link
            href="/activity"
            className="hover:text-white transition-colors"
            aria-label="Activity"
          >
            Activity
          </Link>
        </nav>
      </div>

      {/* Right Section: Connect Wallet and Icons */}
      <div className="flex items-center space-x-4">
        {/* Connect Wallet Button */}
        <ConnectWallet aria-label="Connect Wallet" />

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg- bg-app-dark-surface2 hover:bg-neutral-700 transition-colors text-white flex items-center justify-center w-10 h-10"
          aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>

        {/* Dark Mode Toggle */}
        <button
          className="hidden md:flex p-2 rounded-lg bg- bg-app-dark-surface2 hover:bg-neutral-700 transition-colors text-white flex items-center justify-center w-10 h-10"
          aria-label="Toggle Dark Mode"
        >
          🌙
        </button>

        {/* More Options */}
        <button
          className="hidden md:flex p-2 rounded-lg bg- bg-app-dark-surface2 hover:bg-neutral-700 transition-colors text-white flex items-center justify-center w-10 h-10"
          aria-label="More Options"
        >
          ...
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav
          className="absolute top-[70px] left-0 w-full bg-app-dark-surface3 border-t border-neutral-800 shadow-lg z-[1000]"
          aria-label="Mobile Navigation"
        >
          <ul className="flex flex-col space-y-4 py-4 px-6 text-sm font-medium text-gray-400">
            <li>
              <Link
                href="/home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-white transition-colors"
                aria-label="home"
              >
                Wrap
              </Link>
            </li>
            <li>
              <Link
                href="/swap"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-white transition-colors"
                aria-label="swap"
              >
                Swap Bungee
              </Link>
            </li>
            <li>
              <Link
                href="/wallet"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-white transition-colors"
                aria-label="wallet"
              >
                Wallet
              </Link>
            </li>
            <li>
              <Link
                href="/activity"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-white transition-colors"
                aria-label="Activity"
              >
                Activity
              </Link>
            </li>
            <li>
              {/* Connect Wallet Button for Mobile */}
              <ConnectWallet aria-label="Connect Wallet (Mobile)" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
