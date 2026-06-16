import React, { useState } from 'react';
import { LEGAL_TEAM } from '../../data';
import { TeamMember } from '../../types';

// --- Data for the image accordion mapping our existing partners ---
const accordionItems = LEGAL_TEAM.map((partner, index) => {
  let objectPosition = 'center top'; // default
  
  if (partner.id === 'ali') {
    objectPosition = 'center 22%';
  } else if (partner.id === 'palwasha') {
    objectPosition = 'center 25%';
  } else if (partner.id === 'mansoor') {
    objectPosition = 'center 25%';
  } else if (partner.id === 'ammar') {
    objectPosition = 'center 20%';
  } else if (partner.id === 'taqi') {
    objectPosition = 'center 20%';
  } else if (partner.id === 'malik') {
    objectPosition = 'center 20%';
  } else if (partner.id === 'qalb') {
    objectPosition = 'center 20%';
  } else if (partner.id === 'javed') {
    objectPosition = 'center 20%';
  }

  return {
    id: index + 1,
    title: partner.name,
    imageUrl: partner.id === "ammar" 
      ? "https://images.pexels.com/photos/38052861/pexels-photo-38052861.jpeg" 
      : partner.image,
    rawPartner: partner,
    objectPosition
  };
});

interface AccordionItemProps {
  item: {
    id: number;
    title: string;
    imageUrl: string;
    rawPartner: TeamMember;
    objectPosition?: string;
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
        relative h-[300px] xs:h-[360px] sm:h-[420px] md:h-[460px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-500 ease-in-out min-w-0
        ${
          isActive 
            ? 'flex-[10_10_0%]' 
            : 'flex-[1_1_0%]'
        }
      `}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        referrerPolicy="no-referrer"
        style={{ objectPosition: item.objectPosition }}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
          isActive 
            ? 'scale-100 filter brightness-[1.10] saturate-[1.05] contrast-[1.05]' 
            : 'scale-100 filter grayscale-[15%] brightness-[0.85]'
        }`}
        onError={(e) => { 
          const target = e.target as HTMLImageElement;
          target.onerror = null; 
          target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800'; 
        }}
      />
      {/* Conditional overlay: Subtle gradient on active card, dim overlay on inactive ones */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
          isActive 
            ? 'bg-gradient-to-t from-black/85 via-black/20 to-transparent' 
            : 'bg-black/60'
        }`}
      />

      {/* Caption Text */}
      <span
        style={!isActive ? { writingMode: 'vertical-rl' } : undefined}
        className={`
          absolute text-white font-semibold whitespace-nowrap select-none
          transition-all duration-300 ease-in-out backdrop-blur-xs
          ${
            isActive
              ? 'bottom-4 xs:bottom-6 left-1/2 -translate-x-1/2 rotate-0 text-[9px] xs:text-xs sm:text-sm md:text-base bg-black/75 px-1.5 xs:px-2.5 py-1 rounded-md border border-white/10 shadow-lg' // Active state: horizontal, bottom-center
              // Inactive state: vertical-rl, rotated 180deg so it reads bottom-to-top, perfectly centered in card
              : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-180 text-[7px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm tracking-normal xs:tracking-wider sm:tracking-widest font-sans uppercase text-white/90 block font-bold text-center'
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

  const handleItemClick = (index: number, rawPartner: TeamMember) => {
    if (activeIndex === index) {
      onSelectPartner?.(rawPartner);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="bg-transparent font-sans text-left w-full overflow-hidden">
      <section className="container mx-auto px-4 py-8 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-[32%] text-center lg:text-left animate-fade-in shrink-0">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-bold block mb-3">
              Elite Corporate Council
            </span>
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tighter font-serif">
              Partners & Advocates
            </h1>
            <p className="mt-4 md:mt-6 text-sm md:text-base lg:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Our senior partners are recognized globally for intellectual pedigree, tactical trial posture, and meticulous commercial guidance. Let our supreme counsel defend your sovereign assets.
            </p>
            <div className="mt-6 md:mt-8 flex justify-center lg:justify-start gap-4">
              <a
                href="#contact"
                className="inline-block bg-gold text-[#070e1b] font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-lg shadow-lg hover:bg-gold-light transition-all duration-300 text-xs md:text-sm tracking-wide"
              >
                Contact Us
              </a>
              <a
                href="#firm-profile"
                className="inline-block border border-white/20 hover:border-gold hover:bg-white/5 text-white font-bold px-6 md:px-8 py-2.5 md:py-3 rounded-lg transition-all duration-300 text-xs md:text-sm tracking-wide"
              >
                Chambers Profile
              </a>
            </div>
          </div>

          {/* Right Side: Image Accordion (Unified fluid design for all devices - No Horizontal Scroll!) */}
          <div className="w-full lg:w-[68%] flex flex-col justify-center items-center gap-3">
            
            {/* Desktop & Tablet Display: Single row of all 8 members (No scrolling, beautiful layout) */}
            <div className="hidden sm:flex flex-row items-center justify-center gap-1.5 md:gap-3 p-1 sm:p-4 w-full overflow-hidden select-none">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  onClick={() => handleItemClick(index, item.rawPartner)}
                />
              ))}
            </div>

            {/* Mobile Display: Dual rows of 5 and 3 members (Prevents squeezing, beautiful proportion) */}
            <div className="flex sm:hidden flex-col gap-2.5 w-full">
              {/* Row 1 (Members 1-5) */}
              <div className="flex flex-row items-center justify-center gap-1 p-0.5 w-full overflow-hidden select-none">
                {accordionItems.slice(0, 5).map((item, index) => {
                  const realIndex = index;
                  return (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      isActive={realIndex === activeIndex}
                      onMouseEnter={() => handleItemHover(realIndex)}
                      onClick={() => handleItemClick(realIndex, item.rawPartner)}
                    />
                  );
                })}
              </div>

              {/* Row 2 (Members 6-8) */}
              <div 
                className={`flex flex-row items-center justify-center gap-1 p-0.5 transition-all duration-500 ease-in-out overflow-hidden select-none ${
                  activeIndex >= 5 ? 'w-full' : 'w-[60%] mx-auto'
                }`}
              >
                {accordionItems.slice(5).map((item, index) => {
                  const realIndex = index + 5;
                  return (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      isActive={realIndex === activeIndex}
                      onMouseEnter={() => handleItemHover(realIndex)}
                      onClick={() => handleItemClick(realIndex, item.rawPartner)}
                    />
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
