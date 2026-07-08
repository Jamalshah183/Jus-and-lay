import type { Metadata } from "next";
import CriminalLawPage from "./CriminalLawClient";

export const metadata: Metadata = {
  title: "Criminal & White-Collar Defense | Jus & Lay Law Conglomerate",
  description: "Specialist white-collar crime defense lawyers in Pakistan. Experienced advocates representing clients in NAB, FIA cybercrime, pre-arrest bails, and conviction appeals.",
  alternates: {
    canonical: "https://juslay.com/practices/criminal-law/",
  },
  openGraph: {
    title: "Criminal & White-Collar Defense | Jus & Lay Law Conglomerate",
    description: "Specialist white-collar crime defense lawyers in Pakistan. Experienced advocates representing clients in NAB, FIA cybercrime, pre-arrest bails, and conviction appeals.",
    url: "https://juslay.com/practices/criminal-law/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg",
        width: 800,
        height: 600,
        alt: "Criminal & White-Collar Defense Logo",
      }
    ],
  },
};

export default function Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://juslay.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Criminal & White-Collar Law",
        "item": "https://juslay.com/practices/criminal-law/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CriminalLawPage />
    </>
  );
}
