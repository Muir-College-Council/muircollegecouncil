'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E8E6E1] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image src="/mcc-logo.jpg" alt="Muir College Council Logo" width={40} height={40} className="rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[#5D4A2F] font-semibold leading-tight hidden sm:block">Muir College Council</span>
              <span className="text-xs text-gray-500 hidden md:block">UC San Diego</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <a href="/#about" className="px-4 py-2 text-gray-700 hover:text-[#8B6F47] hover:bg-[#FAF7F2] rounded-lg transition-colors">
              About
            </a>
            <a href="/#meetings" className="px-4 py-2 text-gray-700 hover:text-[#8B6F47] hover:bg-[#FAF7F2] rounded-lg transition-colors">
              Meetings
            </a>
            <a href="/#get-involved" className="px-4 py-2 text-gray-700 hover:text-[#8B6F47] hover:bg-[#FAF7F2] rounded-lg transition-colors">
              Get Involved
            </a>
            <a href="/#funding" className="px-4 py-2 text-gray-700 hover:text-[#8B6F47] hover:bg-[#FAF7F2] rounded-lg transition-colors">
              Apply for Funding
            </a>
            <a
              href="/#events"
              className="ml-2 px-6 py-2 bg-[#7CB342] text-white rounded-lg hover:bg-[#689F38] transition-colors shadow-sm"
            >
              Events
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            <a href="/#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-[#E8F5E1] hover:text-[#2C5530]">
              About
            </a>
            <a href="/#meetings" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-[#E8F5E1] hover:text-[#2C5530]">
              Meetings
            </a>
            <a href="/#get-involved" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-[#E8F5E1] hover:text-[#2C5530]">
              Get Involved
            </a>
            <a href="/#funding" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-[#E8F5E1] hover:text-[#2C5530]">
              Apply for Funding
            </a>
            <div className="pt-4">
              <a
                href="/#events"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-6 py-2 bg-[#7CB342] text-white rounded-lg hover:bg-[#689F38] transition-colors shadow-sm"
              >
                Events
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
