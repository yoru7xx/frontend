import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const navItems = [
  { label: "Home", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Akademik", href: "/akademik" },
  { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Perpustakaan", href: "/perpustakaan" },
  { label: "Pupuk AMA", href: "/pupukama" }
];

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`${transparent ? 'bg-transparent' : 'bg-white shadow-md sticky top-0'} z-40 w-full transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                <img src="/logo.webp" alt="Logo SMPN 17 Malang" className="w-full h-full object-contain" 
                />
              </div>
              <div className="block">
                <h1 className={`text-xl font-bold ${transparent ? 'text-white' : 'text-gray-800'}`}>
                  ESASHAKA
                </h1>
                <p className={`text-xs ${transparent ? 'text-white/80' : 'text-gray-500'}`}>
                  SMP Negeri 17 Malang
                </p>
              </div>
              <div className="w-24 h-24 -ml-10">
                <DotLottieReact src="https://lottie.host/f0407f01-d251-47d9-b1fc-2d5ef2f85b43/bIFPRK6Cm4.lottie" loop autoplay
                />
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isExternal = item.href === "/perpustakaan" || item.href === "/pupukama";
              const className = `${transparent ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-blue-600'} font-medium transition-colors relative group`;

              if (isExternal) {
                return (
                  <a key={item.href} href={item.href} className={className}>
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${transparent ? 'bg-white' : 'bg-blue-600'} group-hover:w-full transition-all duration-300`}></span>
                  </a>
                );
              }

              // Gunakan <Link> untuk menu lainnya agar tetap cepat (SPA)
              return (
                <Link key={item.href} href={item.href}>
                  <a className={className}>
                    {item.label}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 ${transparent ? 'bg-white' : 'bg-blue-600'} group-hover:w-full transition-all duration-300`}></span>
                  </a>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 ${transparent ? 'text-white hover:bg-white/10' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={`lg:hidden mt-4 pb-4 border-t ${transparent ? 'border-white/20 bg-blue-900/95 rounded-b-xl' : 'border-gray-200 bg-white'}`}>
            <div className="flex flex-col gap-2 pt-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`block px-4 py-2 ${transparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'} rounded-lg transition-colors font-medium`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
