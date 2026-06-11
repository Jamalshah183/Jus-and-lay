import React, { useState } from 'react';
import { LEGAL_TEAM } from '../../data';
import { TeamMember } from '../../types';

// --- Data for the image accordion mapping our existing partners ---
const accordionItems = LEGAL_TEAM.map((partner, index) => ({
  id: index + 1,
  title: partner.name,
  imageUrl: partner.id === "ammar" 
    ? "https://images.pexels.com/photos/38052861/pexels-photo-38052861.jpeg" 
    : partner.image,
  rawPartner: partner
}));

interface AccordionItemProps {
  item: {
    id: number;
    title: string;
    imageUrl: string;
    rawPartner: TeamMember;
  };
  isActive: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

// --- Accordion Item Component ---
const AccordionItem: React.FC<AccordionItemProps> = ({ item, isActive, onMouseEnter, onClick }) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out shrink-0
        ${isActive ? 'w-[280px] xs:w-[320px] sm:w-[360px] md:w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-top"
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800'; 
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white text-lg font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out
          ${
            isActive
              ? 'bottom-6 left-1/2 -translate-x-1/2 rotate-0' // Active state: horizontal, bottom-center
              // Inactive state: vertical, positioned at the bottom, for all screen sizes
              : 'w-auto text-left bottom-24 left-1/2 -translate-x-1/2 rotate-90'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

interface LandingAccordionItemProps {
  onSelectPartner?: (partner: TeamMember) => void;
}

// --- Main App Component ---
export function LandingAccordionItem({ onSelectPartner }: LandingAccordionItemProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-transparent font-sans text-left">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-[32%] text-center lg:text-left animate-fade-in">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-3">
              Elite Corporate Council
            </span>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tighter font-serif">
              Partners & Advocates
            </h1>
            <p className="mt-6 text-base lg:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Our senior partners are recognized globally for intellectual pedigree, tactical trial posture, and meticulous commercial guidance. Let our supreme counsel defend your sovereign assets.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                className="inline-block bg-gold text-[#070e1b] font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-gold-light transition-all duration-300 text-sm tracking-wide"
              >
                Contact Us
              </a>
              <a
                href="#firm-profile"
                className="inline-block border border-white/20 hover:border-gold hover:bg-white/5 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 text-sm tracking-wide"
              >
                Chambers Profile
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-[68%] overflow-hidden flex justify-center">
            {/* Changed flex-col to flex-row to keep the layout consistent */}
            <div className="flex flex-row items-center justify-start lg:justify-center gap-4 overflow-x-auto p-4 max-w-full scrollbar-none">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  onClick={() => onSelectPartner?.(item.rawPartner)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
