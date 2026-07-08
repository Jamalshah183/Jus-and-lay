import type { Metadata } from "next";
import App from "../App";

export const metadata: Metadata = {
  title: "Corporate & Banking Law Firm in Pakistan | Jus & Lay Law Conglomerate",
  description: "Jus & Lay is a premier law firm in Pakistan. High Court advocates specializing in Corporate Law, Banking Litigation Defense, SECP Compliance, FBR Tax Appeals, White-Collar NAB trials, and Civil Litigation.",
  alternates: {
    canonical: "https://juslay.com/",
  },
  keywords: [
    "Law firm in Pakistan",
    "Best law firm in Pakistan",
    "Corporate law firm Lahore",
    "Banking lawyers in Pakistan",
    "FBR tax appeals Pakistan",
    "Tax lawyers in Lahore",
    "Customs and taxation law advocate High Court",
    "White-collar crime lawyers Pakistan",
    "NAB trials advocate Lahore",
    "Supreme Court advocates Pakistan",
    "Civil litigation lawyers Lahore",
    "Labor and employment law Pakistan",
    "SECP company incorporation Lahore",
    "Environmental law EPA approvals Pakistan"
  ],
  openGraph: {
    title: "Corporate & Banking Law Firm in Pakistan | Jus & Lay Law Conglomerate",
    description: "Jus & Lay is a premier law firm in Pakistan. High Court advocates specializing in Corporate Law, Banking Litigation Defense, SECP Compliance, FBR Tax Appeals, White-Collar NAB trials, and Civil Litigation.",
    url: "https://juslay.com/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Jus & Lay Law Conglomerate Logo",
      }
    ],
  },
};

export default function Page() {
  const legalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Jus & Lay Law Conglomerate",
    "image": "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
    "@id": "https://juslay.com/#legalservice",
    "url": "https://juslay.com/",
    "telephone": "+92-321-8520085",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Suite No.1, 236-Riwaz Garden",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "postalCode": "54000",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.5647",
      "longitude": "74.3015"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "founder": {
      "@type": "Person",
      "name": "Ammar Yasir Naqvi",
      "jobTitle": "CEO & Advocate High Court",
      "image": "https://images.pexels.com/photos/38052861/pexels-photo-38052861.jpeg"
    },
    "areaServed": [
      {
        "@type": "AdministrativeArea",
        "name": "Lahore"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Karachi"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Islamabad"
      },
      {
        "@type": "Country",
        "name": "Pakistan"
      }
    ],
    "knowsAbout": [
      "Corporate & Commercial Law in Pakistan",
      "Banking Litigation & Recovery Defense",
      "Federal Board of Revenue (FBR) Taxation Appeals",
      "Provincial Sales Tax (PRA, SRB) Compliance",
      "High Court & Supreme Court Legal Appeals",
      "Customs and Excise Laws",
      "White-Collar Crime & NAB Investigations",
      "Civil Trials & Contractual Arbitration",
      "SECP Company Incorporation & Governance",
      "Labour & Employment Law Compliance",
      "EPA & EIA Environmental Approvals"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <App />
    </>
  );
}
