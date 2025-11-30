'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface NavbarProps {
  cartCount: number;
}

const Navbar = ({ cartCount }: NavbarProps) => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on large screen resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // 🔥 FIX: Proper click-outside handler (works on all mobile browsers)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-[9999] w-full border-b border-[#2d1a11] transition-all duration-300 ${isScrolled
        ? 'bg-[#050302]/95 backdrop-blur-md py-2 shadow-sm'
        : 'bg-[#050302]/85 backdrop-blur-sm py-3'
        }`}
    >
      <div className="w-full flex h-auto items-center justify-between px-4 md:px-8 lg:px-12">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-14 w-14 rounded-full border border-[#2d1a11] overflow-hidden bg-[#120a07]">
            <Image src="/images/logo.jpg" alt="Chai Bisket" width={56} height={56} className="object-cover" />
          </div>
          <div>
            <span className="text-lg font-semibold text-[#f5eddc] block leading-tight">CHAI BISKET</span>
            <span className="text-xs font-serif italic tracking-widest text-[#f0a35c] block text-right">Indian Eatery</span>
          </div>
        </Link>

        {/* Right Side Container (Nav + Buttons) */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#menu" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Menu</Link>
            <Link href="#our-story" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Our Story</Link>
            <Link href="#location" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Location</Link>
            <Link href="#contact" className="text-[#f5eddc]/80 hover:text-[#ffd9a0] transition-colors font-medium">Contact</Link>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3">

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#f5eddc] hover:bg-[#1c120c]"
              onClick={() => router.push('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c87534] text-xs font-medium text-[#120a06]">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#f5eddc] hover:bg-[#1c120c]"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
              }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#120a07] border-b border-[#2d1a11] shadow-lg z-[100] rounded-b-3xl">
          <div className="container px-4 py-3 flex flex-col space-y-3">

            <a href="#menu" className="block py-3 text-[#f5eddc] border-b border-[#2d1a11]" onClick={() => setIsMenuOpen(false)}>
              Menu
            </a>
            <a href="#our-story" className="block py-3 text-[#f5eddc] border-b border-[#2d1a11]" onClick={() => setIsMenuOpen(false)}>
              Our Story
            </a>
            <a href="#location" className="block py-3 text-[#f5eddc] border-b border-[#2d1a11]" onClick={() => setIsMenuOpen(false)}>
              Location
            </a>
            <a href="#contact" className="block py-3 text-[#f5eddc]" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
