import React from "react";
import { Star, ShieldCheck, Award } from "lucide-react";

// Simple helper utility to replace className concatenation
function cn(...classes: (string | undefined | null | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface DisplayCardProps {
  key?: React.Key | number;
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  isMiddle?: boolean;
}

function DisplayCard({
  className,
  icon = <Star className="w-4 h-4 text-gold fill-gold" />,
  title = "Featured Counsel",
  description = "Outstanding legal protection and corporate advocacy.",
  date = "Supreme Rating",
  iconClassName = "text-gold",
  titleClassName = "text-gold",
  isMiddle = false,
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[11rem] xs:min-h-[10rem] sm:min-h-[11rem] w-[86vw] xs:w-[20rem] sm:w-[22rem] lg:w-[23rem] -skew-y-[6deg] xs:-skew-y-[8deg] select-text flex-col justify-between rounded-xl border bg-[#0b1424]/95 backdrop-blur-md px-4 py-3.5 transition-all duration-300 [&>*]:flex [&>*]:items-center [&>*]:gap-2 shadow-[0_10px_30px_rgba(4,8,17,0.7)] hover:shadow-[0_15px_40px_rgba(255,188,87,0.15)] hover:scale-[1.03] sm:hover:scale-[1.05] hover:z-[100] group-hover:z-[100]",
        isMiddle 
          ? "border-emerald-500/60 shadow-[0_10px_30px_rgba(16,185,129,0.15)] hover:border-emerald-400" 
          : "border-gold/30 hover:border-gold/60",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className={cn(
          "relative inline-block rounded-full p-1.5 shrink-0 border",
          isMiddle 
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
            : "bg-gold/10 border-gold/30 text-gold"
        )}>
          {isMiddle ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : icon}
        </span>
        <p className={cn(
          "text-xs sm:text-sm font-sans font-extrabold uppercase tracking-widest truncate", 
          isMiddle ? "text-emerald-400" : titleClassName
        )}>
          {title}
        </p>
      </div>
      
      <p className="text-white/90 text-[10.5px] xs:text-xs sm:text-xs leading-relaxed italic line-clamp-3 group-hover:line-clamp-none font-serif pr-2 transition-all duration-300">
        "{description}"
      </p>
      
      <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-white/50 tracking-wider uppercase">
        <span>{date}</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "w-2.5 h-2.5 stroke-none", 
                isMiddle ? "fill-emerald-400" : "fill-gold"
              )} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className: "[grid-area:stack] z-10 translate-x-0 translate-y-0 hover:-translate-y-8",
      icon: <Star className="w-4 h-4 text-gold fill-gold" />,
      title: "Consortium Counsel",
      description: "Jus & Lay structured our energy consortium’s NEPRA licensing and complex joint-venture corporate agreements with extraordinary regulatory diligence.",
      date: "Ziad Yusuf • Indus Energy",
      titleClassName: "text-gold",
      iconClassName: "text-gold"
    },
    {
      className: "[grid-area:stack] z-20 translate-x-1.5 xs:translate-x-3 sm:translate-x-8 translate-y-2.5 xs:translate-y-5 sm:translate-y-7 hover:-translate-y-6",
      icon: <Award className="w-4 h-4 text-gold" />,
      title: "Sovereign Bond Advisory",
      description: "Represented our supreme sovereign housing board during high-value debt-restructuring negotiations. Absolute discretion and brilliant strategic negotiation.",
      date: "Senator Haris • Federal Board",
      titleClassName: "text-gold",
      iconClassName: "text-gold/20"
    },
    {
      className: "[grid-area:stack] z-30 translate-x-3 xs:translate-x-6 sm:translate-x-16 translate-y-5 xs:translate-y-10 sm:translate-y-14 hover:-translate-y-4",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      title: "Litigation Defense",
      description: "Faced with an aggressive tax audit and a simultaneous merger controversy, Ammar Yasir's litigation blueprints dismantled the opposition's framework inside forty-eight hours.",
      date: "Taimur Ghauri • Habib Group",
      titleClassName: "text-emerald-400",
      iconClassName: "text-emerald-400/20",
      isMiddle: true // EXACT MIDDLE CARD of the 5 cards cascade
    },
    {
      className: "[grid-area:stack] z-40 translate-x-4.5 xs:translate-x-9 sm:translate-x-24 translate-y-7.5 xs:translate-y-15 sm:translate-y-21 hover:-translate-y-2",
      icon: <Star className="w-4 h-4 text-gold fill-gold" />,
      title: "Chambers Peer Index",
      description: "Recognized as the premier tier-one legal conglomerate in Lahore for corporate rescue programs, sovereign litigation, and hostile takeover defense mechanisms.",
      date: "Apex Legal Index Rating",
      titleClassName: "text-gold",
      iconClassName: "text-gold/20"
    },
    {
      className: "[grid-area:stack] z-50 translate-x-6 xs:translate-x-12 sm:translate-x-32 translate-y-10 xs:translate-y-20 sm:translate-y-28 hover:-translate-y-0",
      icon: <Award className="w-4 h-4 text-gold" />,
      title: "Corporate Trust Advisory",
      description: "Their elite counsel safeguarded our tech conglomeration during international IPO filings. Their understanding of cross-border intellectual property rules is second to none.",
      date: "Sophia Ahmed • CloudBase",
      titleClassName: "text-gold",
      iconClassName: "text-gold/20"
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 py-12 pb-36 pr-6 xs:pr-12 sm:pr-32 -translate-x-3 xs:-translate-x-6 sm:-translate-x-16 max-w-full">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
