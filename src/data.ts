import { TeamMember } from "./types";

export interface LegalService {
  id: string;
  title: string;
}

export const INTRODUCTION = {
  firmName: "JUS & LAY",
  tagline: "Dedicated, Efficient & Well Reputed Law Firm",
  sentence1: '"JUS & LAY" is a well-established, dedicated, efficient & well reputed law firm which is providing highest quality of legal representation to its clients.',
  sentence2: "As an attorney, our record verdicts and unwavering dedication to represent our client, have earned as a national reputation for diligent, compassionate, and competent advocacy in our areas of law."
};

export const ABOUT_FIRM = {
  paragraph1: '"Jus & Lay" is a well-established, medium-size law firm with significant national capacity through a network of associates, giving us sizable influence in key financial centers throughout the country.',
  paragraph2: "Since Several years, the firm provides the highest quality of legal representation to institutional and individual clients.",
  paragraph3: "We offer a full range of corporate, commercial, civil & criminal legal services, particularly Corporate & Banking Laws litigation as well as an advisory side. Our services to the financial institutions covering corporate matters and transaction based legal opinions on Financial Agreements, documentations, mortgages, execution of documents, verification of documents etc., of the banking clients, including but not limited to, dispute resolution, litigation, arbitration, employment, finance, company registration, tax, trusts and estates."
};

export const FOCUS_AND_APPROACH = {
  paragraph1: "As a corporate and commercial law firm, we focus strongly on the needs of our clients and their respective businesses. Our client base requires a rapid response, appropriate advice and innovative legal solutions based on a full understanding of their individual business needs. The practice is built on its reputation of exceptional service delivery coupled with appropriate and outstanding skills and expertise.",
  paragraph2: "We believe in following a holistic approach to ensure that our clients always receive the best advice.",
  paragraph3: "Our firm is geared for efficiency and accessibility through the range of services we offer and how we interact with our clients. Through our effective network of associates, we can respond swiftly to address the needs of our clients locally and abroad. In search of excellence for the benefit of our clients, we continually seek to find a balance between appropriate legal services and cost-efficiency. We have a keen understanding of global economic and market trends and combined with our commitment to excellence, we have the ability to cut straight to the chase in any matter."
};

export const MAIN_DIVISIONS = [
  {
    number: "1.",
    title: "Corporate & Commercial Legal Services",
    description: "Focusing on transactional and regulatory services."
  },
  {
    number: "2.",
    title: "Litigation & Dispute Resolution",
    description: "Focusing on litigation and alternative dispute resolution in the form of mediation and arbitration."
  }
];

export const EXECUTIVE_SERVICES = [
  "Civil Law",
  "Criminal Law",
  "Employment Law",
  "Environmental Law",
  "Litigation & Dispute Resolution",
  "Corporate & Commercial Litigation",
  "Income Tax, Sale tax"
];

export const FINANCIAL_INSTITUTIONS_SERVICE = {
  title: "Services to Financial Institutions (BOP & HBL)",
  contentiousTitle: "In contentious matters we are dealing with",
  contentious: [
    "Recovery Suit by and against the bank",
    "HR matters",
    "Civil matter",
    "LEA matters"
  ],
  nonContentiousTitle: "In non-contentious matters, we are dealing with",
  nonContentious: [
    "Transaction matters which include syndicate, corporate and commercial financing agreements",
    "Guarantee matters",
    "Security perfection, genuineness veracity of documents",
    "Any related matters assigned to our firm"
  ]
};

export const OUR_CLIENTS = [
  "The Bank Of Punjab",
  "Habib Bank Limited",
  "Bank Al-Falah Limited",
  "Zarai Taraqiati Bank Ltd",
  "M/S Noor LPG Private Limited",
  "Feroz sons Trust",
  "Fatima Memorial Hospital",
  "M/S Tabeer Travels & Tourism",
  "M/S Good Lucks Tanneries",
  "M/S Jameela Tanneries"
];

export const LEGAL_TEAM: TeamMember[] = [
  {
    id: "ammar",
    name: "AMMAR YASIR NAQVI",
    role: "CEO",
    bio: "B.com, LL.B Advocate High Court. Area of Practice: Banking, Corporate, Commercial, Criminal, Civil, Constitutional Laws.",
    image: "https://images.pexels.com/photos/38052861/pexels-photo-38052861.jpeg",
    email: "ceo@juslay.com",
    phone: "+92 (321) 852-0085"
  },
  {
    id: "ali",
    name: "Muhammad Ali Anwar",
    role: "Advocate High Court",
    bio: "Advocate High Court.",
    image: "https://images.pexels.com/photos/38097665/pexels-photo-38097665.jpeg",
    email: "ali.anwar@juslay.com",
    phone: "+92 (321) 852-0085"
  },
  {
    id: "malik",
    name: "MALIK ABID HUSSAIN AWAN",
    role: "Senior Associate",
    bio: "B.A, LL. B Advocate High Court. Area of Practice: Criminal, Civil, Constitutional Laws.",
    image: "https://images.pexels.com/photos/38097667/pexels-photo-38097667.jpeg",
    email: "abid.awan@juslay.com",
    phone: "+92 (321) 852-0085"
  },
  {
    id: "taqi",
    name: "SYED TAQI UL HASSAN",
    role: "Senior Associate",
    bio: "LL.M from University of Sunderland, UK Advocate High Court. Area of Practice: Criminal, Civil, Constitutional Laws.",
    image: "https://images.pexels.com/photos/38097666/pexels-photo-38097666.jpeg",
    email: "taqi.hassan@juslay.com",
    phone: "+92 (321) 852-0085"
  }
];

export const IMAGES = {
  heroBg: "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg",
  aboutBg: "https://images.pexels.com/photos/7781900/pexels-photo-7781900.jpeg",
  practiceBg: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1920",
  consultBg: "https://images.unsplash.com/photo-1505664194779-8bebcb3f3739?auto=format&fit=crop&q=80&w=1920"
};
