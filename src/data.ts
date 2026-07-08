import { TeamMember } from "./types";

export interface LegalService {
  id: string;
  title: string;
}

export const INTRODUCTION = {
  firmName: "JUS & LAY",
  tagline: "Advocates, Legal Consultants & Corporate Advisors",
  sentence1: "JUS & LAY is a distinguished full-service law firm committed to delivering exceptional legal solutions to corporate entities, financial institutions, businesses, and individual clients. Built upon a foundation of professional excellence, integrity, and client-focused service, the firm has established a reputation for providing practical, commercially sound, and result-oriented legal advice.",
  sentence2: "Our lawyers combine extensive legal expertise with a deep understanding of commercial realities, enabling us to provide innovative solutions to complex legal and regulatory challenges. Through unwavering dedication to our clients’ interests, we have earned recognition for our professionalism, strategic insight, and effective representation."
};

export const ABOUT_FIRM = {
  paragraph1: "JUS & LAY is a well-established law firm with a strong presence across Pakistan through an extensive network of professional associates and legal practitioners. This nationwide reach enables us to provide seamless legal services across major commercial and financial centers of the country.",
  paragraph2: "Over the years, the firm has successfully represented a diverse range of clients, including financial institutions, corporate entities, trusts, healthcare organizations, and private businesses. We provide comprehensive legal services encompassing corporate advisory, banking and finance, commercial transactions, dispute resolution, litigation, regulatory compliance, employment matters, taxation, and corporate governance.",
  paragraph3: "Our expertise extends to advising financial institutions on transactional matters, financing arrangements, security documentation, mortgages, legal due diligence, verification of title and corporate records, enforcement proceedings, and regulatory compliance."
};

export const OUR_PHILOSOPHY = {
  paragraph1: "At JUS & LAY, we recognize that every client faces unique legal and commercial challenges. Accordingly, our approach is based on a thorough understanding of our clients’ business objectives, industry dynamics, and risk considerations.",
  commitments: [
    "Delivering practical and commercially viable legal solutions.",
    "Providing timely and responsive legal services.",
    "Maintaining the highest standards of professional integrity.",
    "Building long-term relationships based on trust and reliability.",
    "Ensuring cost-effective and value-driven legal representation."
  ],
  paragraph2: "Our commitment to excellence, combined with our understanding of evolving market and regulatory developments, enables us to provide strategic legal advice that supports our clients’ business growth and protects their interests."
};

export const PRACTICE_AREAS = [
  {
    title: "Corporate & Commercial Law",
    items: [
      "Corporate structuring & governance under Pakistan Companies Act 2017",
      "SECP company incorporation, registration, and statutory filings",
      "Drafting commercial contracts, partnership deeds, and corporate agreements",
      "Mergers, acquisitions, joint ventures, and business restructuring",
      "Board of Investment (BOI) and regulatory compliance advisory",
      "Public-private partnerships and strategic commercial alliances"
    ]
  },
  {
    title: "Banking & Finance",
    items: [
      "Corporate finance, syndications, and Islamic banking facilities",
      "Loan agreements, security documentation, and charge perfection",
      "Mortgage creation, validation of title deeds, and registry search",
      "Banking litigation and debt recovery defense under FIO 2001",
      "Legal due diligence reports and security valuation verification",
      "Financial structuring advisory for national and foreign institutions"
    ]
  },
  {
    title: "Litigation & Dispute Resolution",
    items: [
      "Civil trial advocacy and contractual enforcement proceedings",
      "Commercial disputes, liquidations, and shareholder petitions",
      "Banking recoveries and financial litigation before Banking Courts",
      "Domestic and international commercial arbitration and mediation",
      "High Court constitutional writ petitions and appellate practice",
      "Execution of decrees and recovery actions nationwide"
    ]
  },
  {
    title: "Employment & Labour Law",
    items: [
      "Employment contracts, HR manuals, and executive severance policies",
      "Workplace grievance redressal and wrongful termination disputes",
      "EOBI registration, PESSI social security, and labor court defense",
      "Labor law compliance advisory for industrial and service sectors"
    ]
  },
  {
    title: "Taxation",
    items: [
      "FBR Income Tax registration, filing, and audit representations",
      "Provincial Sales Tax (PRA, SRB) audit appeals & tax compliance",
      "Appellate Tribunal Inland Revenue (ATIR) appeal representations",
      "High Court tax stay orders and reference applications"
    ]
  },
  {
    title: "Criminal Law",
    items: [
      "NAB investigations, white-collar crime defense, and bail petitions",
      "FIA corporate crime inquiries, cybercrime, and AML representations",
      "Trial advocacy before Sessions Courts and criminal appeals in High Courts"
    ]
  },
  {
    title: "Environmental & Regulatory Law",
    items: [
      "EIA (Environmental Impact Assessment) and IEE reports compliance",
      "EPA Punjab & federal environmental tribunal representations",
      "Regulatory approvals, NOC acquisitions, and administrative hearings"
    ]
  }
];

export const FINANCIAL_INSTITUTIONS_SERVICE = {
  title: "Services to Financial Institutions",
  subtitle: "The firm regularly advises and represents leading financial institutions, including commercial banks and development finance institutions, in both contentious and non-contentious matters.",
  contentiousTitle: "Contentious Matters",
  contentious: [
    "Recovery suits by and against financial institutions",
    "Banking and finance disputes",
    "Employment and human resource matters",
    "Civil litigation",
    "Matters involving law enforcement and regulatory authorities",
    "Enforcement of securities and guarantees"
  ],
  nonContentiousTitle: "Non-Contentious Matters",
  nonContentious: [
    "Corporate, commercial, and syndicated financing transactions",
    "Drafting and review of financing agreements",
    "Guarantee and indemnity documentation",
    "Security creation and perfection",
    "Verification, authentication, and legal due diligence of documents",
    "Regulatory and compliance advisory",
    "Legal opinions relating to banking and commercial transactions"
  ]
};

export const CLIENTS_BY_SECTOR = {
  financial: [
    "The Bank of Punjab",
    "Habib Bank Limited (HBL)",
    "Bank Alfalah Limited",
    "Standard Chartered Bank Pakistan",
    "Zarai Taraqiati Bank Limited (ZTBL)"
  ],
  corporate: [
    "Noor LPG (Private) Limited",
    "Ferozsons Trust",
    "Fatima Memorial Hospital",
    "NUR Foundation",
    "Tabeer Travels & Tourism",
    "Good Luck Tanneries",
    "Jameela Tanneries"
  ]
};

export const OUR_CLIENTS = [
  "The Bank of Punjab",
  "Habib Bank Limited (HBL)",
  "Bank Alfalah Limited",
  "Standard Chartered Bank Pakistan",
  "Zarai Taraqiati Bank Limited (ZTBL)",
  "Noor LPG (Private) Limited",
  "Ferozsons Trust",
  "Fatima Memorial Hospital",
  "NUR Foundation",
  "Tabeer Travels & Tourism",
  "Good Luck Tanneries",
  "Jameela Tanneries"
];

export const COMMITMENT_TO_EXCELLENCE = {
  paragraph: "At JUS & LAY, we strive to provide legal services that combine technical excellence, commercial awareness, and strategic thinking. Our objective is not merely to resolve legal issues but to become trusted advisors who contribute meaningfully to our clients’ long-term success.",
  signoff: "JUS & LAY – Advocates, Legal Consultants & Corporate Advisors"
};

export const LEGAL_TEAM: TeamMember[] = [
  {
    id: "ammar",
    name: "AMMAR YASIR NAQVI",
    role: "CEO",
    bio: "B.com, LL.B Advocate High Court. Area of Practice: Banking, Corporate, Commercial, Criminal, Civil, Constitutional Laws.",
    image: "https://images.pexels.com/photos/38052861/pexels-photo-38052861.jpeg",
    email: "ceo@jusandlay.com",
    phone: "+92 (321) 852-0085"
  },
  {
    id: "ali",
    name: "Muhammad Ali Anwar",
    role: "Advocate High Court",
    bio: "Advocate High Court.",
    image: "https://images.pexels.com/photos/38097665/pexels-photo-38097665.jpeg",
    email: "ali.anwar@jusandlay.com",
    phone: "+92 (331) 442-2906"
  },
  {
    id: "malik",
    name: "MALIK ABID HUSSAIN AWAN",
    role: "Senior Associate",
    bio: "B.A, LL. B Advocate High Court. Area of Practice: Criminal, Civil, Constitutional Laws.",
    image: "https://images.pexels.com/photos/38097667/pexels-photo-38097667.jpeg",
    email: "abid.awan@jusandlay.com",
    phone: "+92 (300) 777-7167"
  },
  {
    id: "taqi",
    name: "SYED TAQI UL HASSAN",
    role: "Senior Associate",
    bio: "LL.M from University of Sunderland, UK Advocate High Court. Area of Practice: Criminal, Civil, Constitutional Laws.",
    image: "https://images.pexels.com/photos/38097666/pexels-photo-38097666.jpeg",
    email: "taqi.hassan@jusandlay.com",
    phone: "+92 (323) 470-1617"
  },
  {
    id: "qalb",
    name: "Syed Qalb E Abbas",
    role: "Advocate High Court",
    bio: "LL.B Advocate High Court.",
    image: "https://images.pexels.com/photos/38098637/pexels-photo-38098637.jpeg",
    email: "qalb.abbas@jusandlay.com",
    phone: "+92 (333) 472-6790"
  },
  {
    id: "javed",
    name: "Javed Hashmi",
    role: "Advocate High Court",
    bio: "Advocate High Court.",
    image: "https://images.pexels.com/photos/38098705/pexels-photo-38098705.jpeg",
    email: "javed.hashmi@jusandlay.com",
    phone: "+92 (300) 445-2839"
  },
  {
    id: "mansoor",
    name: "Muhammad Mansoor",
    role: "Advocate High Court",
    bio: "BA LLB. Area of Practice: Customs and Taxation Laws.",
    image: "https://images.pexels.com/photos/38145957/pexels-photo-38145957.jpeg",
    email: "muhammad.mansoor@jusandlay.com",
    phone: "+92 (322) 457-6588"
  },
  {
    id: "palwasha",
    name: "Palwasha Tariq",
    role: "Advocate High Court",
    bio: "B.A, LLB. Area of Practice: Family, Civil, Criminal, and Corporate Laws.",
    image: "https://images.pexels.com/photos/38146781/pexels-photo-38146781.jpeg",
    email: "palwasha.tariq@jusandlay.com",
    phone: "+92 (300) 912-8667"
  }
];

export const IMAGES = {
  heroBg: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg",
  aboutBg: "https://images.pexels.com/photos/7781900/pexels-photo-7781900.jpeg",
  practiceBg: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1920",
  consultBg: "https://images.unsplash.com/photo-1505664194779-8bebcb3f3739?auto=format&fit=crop&q=80&w=1920"
};
