import { PracticeArea, TeamMember, Stat, Testimonial } from "./types";

export const STATS: Stat[] = [
  {
    id: "experience",
    label: "Years of Elite Counsel",
    value: "10+",
    icon: "Award",
  },
  {
    id: "cases",
    label: "High-Stakes Litigations",
    value: "500+",
    icon: "Briefcase",
  },
  {
    id: "success",
    label: "Case Success Rate",
    value: "97.4%",
    icon: "ShieldCheck",
  },
  {
    id: "geography",
    label: "Jurisdictional Zones",
    value: "12",
    icon: "Globe",
  },
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "corporate",
    title: "Corporate & M&A Law",
    description: "Strategic advisory on high-value mergers, board compliance, initial public offerings, and international corporate governance.",
    longDesc: "We represent leading corporations, multinational syndicates, and rapid-growth technology ventures in delicate transactions, public offerings, strategic restructurings, and day-to-day corporate governance counsel.",
    icon: "Building",
  },
  {
    id: "litigation",
    title: "Complex Civil Litigation",
    description: "Fierce representation in appellate trials, contract breaches, class-action defenses, and white-collar defense.",
    longDesc: "Our veteran litigation team prepares every single dispute with high-resolution trial-readiness, asserting client rights with formidable research, flawless argument flow, and persuasive poise before civil court benches.",
    icon: "Scale",
  },
  {
    id: "family",
    title: "Matrimonial Trusts & Family",
    description: "Empathetic, highly discrete planning for asset allocation, cross-border estates, and domestic trusts.",
    longDesc: "We provide strategic legal architecture for high-net-worth familial restructuring, prenuptial covenants, multi-generational wealth preservation trusts, and customized marital agreements with absolute confidentiality.",
    icon: "HeartHandshake",
  },
  {
    id: "property",
    title: "Commercial Property & Zoning",
    description: "Elite transactions, eminent domain shielding, regulatory approvals, and structural project financing.",
    longDesc: "Our real estate attorneys handle large-scale developments, zoning variance defense, sovereign land leases, structural building finance, and title dispute resolution with meticulous administrative precision.",
    icon: "Landmark",
  },
  {
    id: "tax",
    title: "Tax & Business Advisory",
    description: "Enterprise level tax shielding, cross-border restructuring, state and federal tax audits, and compliance audits.",
    longDesc: "Navigating international trade laws and tax codes, we engineer legal frameworks to prevent double-taxation, audit exposure, and compliance bottlenecks, securing multi-tiered asset protection structures.",
    icon: "TrendingUp",
  },
  {
    id: "contracts",
    title: "Ironclad Contract Drafting",
    description: "Aesthetic preparation, licensing defense, structured supply contracts, and meticulous litigation risk audits.",
    longDesc: "Every phrase, punctuation, and clause drafted by Jus & Lay undergoes rigorous stress-tests. We audit existing legal agreements to isolate liability loopholes and formulate resilient business treaties.",
    icon: "FileText",
  },
];

export const WHY_CHOOSE_US = [
  {
    id: "comm",
    title: "Transparent Advisory",
    description: "Immediate briefings, direct partner telephone access, and transparent pricing structures. We translate labyrinthine legal procedures into plain-language executive metrics.",
    icon: "ChevronRight",
  },
  {
    id: "strategy",
    title: "Formidable Legal Strategy",
    description: "We deploy interdisciplinary groups of tax, corporate, and trial experts to formulate unique multi-layered arguments that shield assets and exhaust opposition postures.",
    icon: "Shield",
  },
  {
    id: "client",
    title: "Partner-Led Dedication",
    description: "We purposefully restrict our active docket volume to guarantee undivided attention from our lead senior partners, delivering elite custom resources to every briefcase.",
    icon: "UserCheck",
  },
  {
    id: "handling",
    title: "Elite Case Execution",
    description: "Our digital docket room features 256-bit secure document synchronization, automated compliance alerting, and rigorous forensic research on every evidentiary component.",
    icon: "Cpu",
  },
];

export const LEGAL_TEAM: TeamMember[] = [
  {
    id: "marcus",
    name: "Marcus J. Jus, Esq.",
    role: "Founding Partner & Chief Corporate Strategist",
    bio: "Marcus brings over 18 years of pioneering counsel in corporate cross-border mergers and strategic antitrust advisory. Formerly leading the global M&A division at an elite New York firm, he is known for drafting highly creative corporate solutions. Dr. Jus received his J.D. with honors from Harvard Law.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600&h=800",
    email: "m.jus@juslayconglomerate.com",
    phone: "+1 (800) 555-0391",
    linkedin: "https://linkedin.com/in/marcus-jus-law",
  },
  {
    id: "serena",
    name: "Serena A. Lay, LL.M.",
    role: "Senior Partner & High-Stakes Litigator",
    bio: "Serena is a formidable corporate and civil trial lawyer, having secured over $400M in arbitration and trial awards. Renowned for her photographic command of procedural case law, she serves as chief counsel for real estate developers and corporate boards in severe zoning controversies status. Serena graduated first-in-class from Oxford Law.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=800",
    email: "s.lay@juslayconglomerate.com",
    phone: "+1 (800) 555-0392",
    linkedin: "https://linkedin.com/in/serena-lay-law",
  },
  {
    id: "julian",
    name: "Julian S. Ward",
    role: "Lead Counsel, Tax & Business Structuring",
    bio: "Julian specializes in global taxation, multi-jurisdictional compliance shields, and pre-IPO organizational audits. He bridges tax law with business venture structuring, advising boards on systemic tax optimization schemes. Master of Laws graduate from Stanford University.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=800",
    email: "j.ward@juslayconglomerate.com",
    phone: "+1 (800) 555-0393",
    linkedin: "https://linkedin.com/in/julian-ward-law",
  },
  {
    id: "elena",
    name: "Elena Vance, J.D.",
    role: "Director of Civil Liberties & Commercial Disputes",
    bio: "Elena commands the courtroom floor with high-poise cross-examinations and ironclad brief construction. She heads our class-action corporate defense department and guides families through sensitive, executive matrimonial disputes. Graduate of Columbia Law School.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800",
    email: "e.vance@juslayconglomerate.com",
    phone: "+1 (800) 555-0394",
    linkedin: "https://linkedin.com/in/elena-vance-law",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Jus & Lay handled our complex Series C structuring and regulatory defense with incomparable foresight. Their partners' commitment was genuine, precise, and completely secure.",
    author: "Maximilian Sterling",
    role: "Chief Executive Officer",
    company: "Aether Dynamics Inc.",
  },
  {
    id: "t2",
    quote: "During a major property acquisition controversy spanning three sovereign regions, Serena Lay's litigation blueprints dismantled the opposition's framework inside forty-eight hours.",
    author: "Eleanor Vance-Croft",
    role: "Chief Legal Officer",
    company: "Lexington Estates Group",
  },
];

export const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1920", // courthouse pillars
  aboutBg: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1920", // clean lawyer signature desk/library
  practiceBg: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1920", // law library bookshelves
  consultBg: "https://images.unsplash.com/photo-1505664194779-8bebcb95c539?auto=format&fit=crop&q=80&w=1920", // premium wood scales of justice & books
};
