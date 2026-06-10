import { PracticeArea, TeamMember, Stat, Testimonial } from "./types";

export const STATS: Stat[] = [
  {
    id: "experience",
    label: "Years of Supreme Counsel",
    value: "20+",
    icon: "Award",
  },
  {
    id: "cases",
    label: "High-Stakes Corporate Disputes",
    value: "800+",
    icon: "Briefcase",
  },
  {
    id: "success",
    label: "SECP & Regulatory Clearances",
    value: "98.7%",
    icon: "ShieldCheck",
  },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "corporate",
    title: "Corporate Governance & M&A",
    description: "Executive advisory on foreign direct investment, joint ventures, SECP compliance, and Competition Commission of Pakistan (CCP) merger clearances.",
    longDesc: "We represent premier national conglomerates, multinational corporations, and private equity syndicates in complex acquisitions, IPOs, corporate restructurings, and day-to-day SECP filing protocols.",
    icon: "Building",
  },
  {
    id: "energy",
    title: "Energy & Infrastructure Projects",
    description: "Regulatory advisory, PPA negotiation, NEPRA and OGRA tariff licensing, and commercial project financing structures for IPPs.",
    longDesc: "Our specialist energy desk acts for independent power producers (IPPs), solar ventures, and oil & gas groups, advising on sovereign guarantees, power purchase agreements (PPA), and complex administrative tariff hearings.",
    icon: "Scale",
  },
  {
    id: "litigation",
    title: "Appellate & Commercial Litigation",
    description: "Formidable representation in writ petitions, shipping and banking defenses, and trials before the High Courts and Supreme Court of Pakistan.",
    longDesc: "With an exceptional trial record, our partners manage sophisticated civil and banking disputes before the Sindh High Court, Lahore High Court, Islamabad High Court, and appellate forums.",
    icon: "HeartHandshake",
  },
  {
    id: "property",
    title: "Real Estate & Commercial Zoning",
    description: "Structural real-estate acquisitions, land leasehold clearances, public-private partnership (PPP) contracts, and industrial land allocations.",
    longDesc: "We represent commercial property developers and industrial groups in land acquisition filings, zoning disputes under local authorities, real estate trust planning, and title security disputes.",
    icon: "Landmark",
  },
  {
    id: "tax",
    title: "Tax, Customs & Treasury Defense",
    description: "Appellate representation before the FBR, custom tariff dispute resolution, corporate tax planning, and provincial income tax tribunals.",
    longDesc: "We represent institutional clients in tax shielding corporate structures, auditing of customs duties, and aggressive defense of recovery notices before the FBR, Sindh Revenue Board, and High Courts.",
    icon: "TrendingUp",
  },
  {
    id: "contracts",
    title: "Sovereign Contract Architecture",
    description: "Expert drafting and defense of public concession contracts, international supply chains, and complex litigation risk audits.",
    longDesc: "Every phrase, clause, and indemnity line drafted by our team undergoes severe stress testing for Pakistani judicial exposure. We audit legacy joint ventures to insulate clients from systemic vulnerabilities.",
    icon: "FileText",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: "comm",
    title: "Boardroom-Ready Advisory",
    description: "We deliver analytical briefs, direct partner contact channels, and clear commercial strategies. We translate complex law into raw corporate risk matrices.",
    icon: "ChevronRight",
  },
  {
    id: "strategy",
    title: "Formidable Trial Record",
    description: "We deploy aggressive, multi-disciplinary groups of tax, commercial, and Supreme Court advocates to insulate assets and secure fast injunctive relief.",
    icon: "Shield",
  },
  {
    id: "client",
    title: "Partner-Led Dedication",
    description: "We purposefully limit our portfolio workload, guaranteeing that senior partners (Barristers & advocates of the Supreme Court) actively lead every single transaction.",
    icon: "UserCheck",
  },
  {
    id: "handling",
    title: "Rigorous Forensic Auditing",
    description: "Our secure data chambers utilize absolute privacy synchronization, automated regulatory alerts, and high-fidelity forensic indexing of corporate dockets.",
    icon: "Cpu",
  },
];

export const LEGAL_TEAM: TeamMember[] = [
  {
    id: "ammar",
    name: "Ammar Yasir Naqvi",
    role: "Chief Executive Officer & Managing Partner",
    bio: "Ammar Yasir Naqvi leads Jus & Lay Law Conglomerate as its Chief Executive Officer, specializing in sovereign strategic counsel, high-value transnational corporate mergers, and executive board advisory. Known for restructuring complex corporate syndicates and steering high-profile litigation shields, he advises Pakistan’s premier industrial and energy ventures.",
    image: "https://images.pexels.com/photos/38037504/pexels-photo-38037504.png",
    email: "ceo@juslay.pk",
    phone: "+92 (321) 852-0085",
    linkedin: "https://linkedin.com/in/ammar-yasir-law",
  },
  {
    id: "marcus",
    name: "Barrister Jamal M. Shah",
    role: "Founding Partner & Advocate Supreme Court",
    bio: "Barrister Shah commands over 22 years of supreme judicial counsel, representing top-tier conglomerates, state financial bodies, and multinationals in civil writ petitions and antitrust matters. Called to the Bar at Lincoln’s Inn, he is recognized for crafting sophisticated high-stakes litigation strategies in corporate Pakistan.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800",
    email: "j.shah@juslay.pk",
    phone: "+92 (321) 852-0085",
    linkedin: "https://linkedin.com/in/jamal-shah-law",
  },
  {
    id: "serena",
    name: "Ayesha Khan Lodhi, LL.M.",
    role: "Senior Partner, Corporate Governance & M&A",
    bio: "Ayesha is an authority on Pakistani corporate clearances, cross-border joint ventures, and SECP transactions. Over her 15-year career, she has secured antitrust approvals for numerous multi-billion rupee mergers. Ayesha graduated with distinction from Harvard Law School and routinely advises foreign direct investment consorts.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800",
    email: "a.lodhi@juslay.pk",
    phone: "+92 (321) 852-0085",
    linkedin: "https://linkedin.com/in/ayesha-lodhi-law",
  },
  {
    id: "julian",
    name: "Zane Malik, J.D.",
    role: "Head of Infrastructure, Energy & Tax Services",
    bio: "Zane manages our tax and energy regulatory desk, representing independent power producers (IPPs), manufacturing giants, and industrial unions. He regularly advocates in complex tariff appeals before NEPRA and OGRA, and defends tax recovery actions before the FBR. Zane is an LLM graduate of London School of Economics.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800",
    email: "z.malik@juslay.pk",
    phone: "+92 (321) 852-0085",
    linkedin: "https://linkedin.com/in/zane-malik-law",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Jus & Lay Law Conglomerate structured our energy consortium’s NEPRA tariff licensing and complex joint-venture corporate agreements with extraordinary diligence and deep regulatory authority.",
    author: "Ziad Yusuf",
    role: "Executive Director",
    company: "Indus Energy Holdings Ltd.",
  },
  {
    id: "t2",
    quote: "Faced with an aggressive FBR tax audit and a simultaneous regional merger controversy, Jus & Lay's litigation blueprints dismantled the opposition's framework inside forty-eight hours.",
    author: "Taimur Ghauri",
    role: "Group General Counsel",
    company: "Habib Commercial Group",
  },
];

export const IMAGES = {
  heroBg: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg", // courthouse pillars
  aboutBg: "https://images.pexels.com/photos/7781900/pexels-photo-7781900.jpeg", // clean lawyer signature desk/library
  practiceBg: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1920", // law library bookshelves
  consultBg: "https://images.unsplash.com/photo-1505664194779-8bebcb3f3739?auto=format&fit=crop&q=80&w=1920", // premium wood scales of justice & books
};
