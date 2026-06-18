import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Shield, Gavel } from "lucide-react";

interface NavbarProps {
  onOpenConsultationsHistory?: () => void;
  consultationCount?: number;
  onServicesClick?: () => void;
  onOpenClientPortal?: () => void;
  onOpenAdminPortal?: () => void;
}

export default function Navbar({ onOpenConsultationsHistory, consultationCount = 0, onServicesClick, onOpenClientPortal, onOpenAdminPortal }: NavbarProps) {
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
    { label: "About Chambers", href: "#about" },
    { label: "Our Services", href: "#firm-profile" },
    { label: "Of Counsel", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#firm-profile" && onServicesClick) {
      onServicesClick();
    }
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b shadow-sm ${
        isScrolled
          ? "bg-[#faf8f4]/95 backdrop-blur-md border-gold/30 py-2 shadow-lg"
          : "bg-[#fdfbf7] border-gold/20 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 xl:px-12 flex items-center justify-between">
        {/* Brand Logo - Pakistani Corporate Chambers */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="relative h-12 w-52 sm:w-56 md:w-56 flex items-center group focus:outline-none"
        >
          <img
            src="https://images.pexels.com/photos/38052959/pexels-photo-38052959.png"
            alt="Jus & Lay Law Conglomerate Logo"
            className="absolute left-0 top-1/2 -translate-y-1/2 mt-[-2px] h-[88px] sm:h-[98px] md:h-[94px] max-w-none w-auto object-contain transition-transform group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs font-sans tracking-wider font-bold text-navy-dark/90 hover:text-gold transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-navy-light/20" />

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenClientPortal}
              className="px-4 py-2.5 text-[10px] tracking-widest uppercase font-bold font-sans bg-[#0c1a30] text-gold border border-gold/40 rounded-xs hover:bg-gold hover:text-navy hover:shadow-[0_0_15px_rgba(215,160,82,0.35)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Client Portal</span>
            </button>
            <button
              onClick={onOpenAdminPortal}
              className="px-4 py-2.5 text-[10px] tracking-widest uppercase font-bold font-sans bg-[#bd9e5f] hover:bg-[#a28245] text-white border border-gold/20 rounded-xs hover:shadow-[0_0_15px_rgba(189,158,95,0.3)] transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Gavel className="w-3.5 h-3.5 shrink-0" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-navy/20 rounded-sm text-navy hover:text-gold hover:border-gold/40 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-[100%] inset-x-0 bg-[#fdfbf7]/98 backdrop-blur-lg border-b border-gold/30 py-6 px-6 shadow-2xl flex flex-col gap-6 animate-fade-in">
          <div className="flex flex-col gap-4 text-left">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-sans tracking-wide font-semibold text-navy-dark/95 hover:text-gold py-1 border-b border-gold/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => {
                if (onOpenClientPortal) onOpenClientPortal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-3 text-xs tracking-widest uppercase font-bold font-sans bg-[#0c1a30] text-gold border border-gold/40 rounded-sm hover:bg-gold hover:text-navy transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shield className="w-4 h-4 text-gold shrink-0" />
              <span>Client Portal</span>
            </button>
            <button
              onClick={() => {
                if (onOpenAdminPortal) onOpenAdminPortal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-center px-4 py-3 text-xs tracking-widest uppercase font-bold font-sans bg-[#bd9e5f] text-white border border-gold/20 rounded-sm hover:bg-[#a28245] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Gavel className="w-4 h-4 shrink-0" />
              <span>Admin Portal</span>
            </button>
            <a
              href="tel:03218520085"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs tracking-widest uppercase font-medium font-sans border border-navy/20 text-navy rounded-xs hover:bg-navy/5 transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-gold" />
              Chambers Landline Desk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
