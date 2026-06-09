import React, { useState, useEffect } from "react";
import { Scale, Menu, X, Phone, Calendar } from "lucide-react";

interface NavbarProps {
  onOpenConsultationsHistory: () => void;
  consultationCount: number;
}

export default function Navbar({ onOpenConsultationsHistory, consultationCount }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About Firm", href: "#about" },
    { label: "Practice Areas", href: "#practices" },
    { label: "Why Jus & Lay", href: "#why-choose-us" },
    { label: "Our Team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-navy/95 backdrop-blur-md border-navy-light py-4 shadow-lg"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="p-2 border border-gold/40 rounded-sm bg-navy-dark/40 group-hover:border-gold group-hover:bg-navy-light/60 transition-all duration-300">
            <Scale className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-white uppercase group-hover:text-gold transition-colors">
              Jus & Lay
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-gold/80 font-semibold font-sans">
              Law Conglomerate
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-sans tracking-wider font-medium text-white/80 hover:text-gold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-white/20" />

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {consultationCount > 0 && (
              <button
                onClick={onOpenConsultationsHistory}
                className="relative p-2 text-white/75 hover:text-gold transition-colors focus:outline-none"
                title="My Consultation Bookings"
              >
                <span className="absolute -top-1 -right-1 bg-gold text-navy font-bold text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full animate-pulse">
                  {consultationCount}
                </span>
                <Calendar className="w-5 h-5" />
              </button>
            )}

            <a
              href="#consultation"
              onClick={(e) => handleLinkClick(e, "#consultation")}
              className="px-5 py-2.5 text-xs tracking-widest uppercase font-bold font-sans bg-gold text-navy rounded-xs hover:bg-white hover:text-navy hover:shadow-[0_0_15px_rgba(255,188,87,0.3)] transition-all duration-300"
            >
              Book Advisory
            </a>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          {consultationCount > 0 && (
            <button
              onClick={onOpenConsultationsHistory}
              className="relative p-2 text-white/80 hover:text-gold transition-colors"
            >
              <span className="absolute top-0 right-0 bg-gold text-navy font-bold text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                {consultationCount}
              </span>
              <Calendar className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-white/20 rounded-sm text-white hover:text-gold hover:border-gold/40 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] inset-x-0 bg-navy/98 backdrop-blur-lg border-b border-navy-light py-6 px-6 shadow-2xl flex flex-col gap-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-sans tracking-wide font-medium text-white/95 hover:text-gold py-1 border-b border-navy-light/40"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href="#consultation"
              onClick={(e) => handleLinkClick(e, "#consultation")}
              className="w-full text-center px-5 py-3 text-xs tracking-widest uppercase font-bold font-sans bg-gold text-navy rounded-xs hover:bg-white hover:text-navy transition-all duration-300"
            >
              Book Consultation
            </a>
            <a
              href="tel:+18005550391"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs tracking-widest uppercase font-medium font-sans border border-white/20 text-white rounded-xs hover:bg-white/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-gold" />
              Direct Dial
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
