import type { Metadata } from "next";
import TeamPage from "./TeamClient";

export const metadata: Metadata = {
  title: "Jus and Lay Advocates & Of Counsel Directory | Jus & Lay Law",
  description: "Browse the directory of trial advocates, commercial consultants, and of-counsel attorneys at Jus and Lay Law Conglomerate (Jus & Lay) in Pakistan.",
  alternates: {
    canonical: "https://jusandlay.com/team",
  },
  keywords: [
    "Jus and Lay",
    "Jus and Lay team",
    "Jus and Lay Law Conglomerate",
    "High Court advocates Lahore",
    "Trial lawyers Pakistan",
    "Senior legal partners Lahore",
    "Jus and Lay legal team",
    "Best advocates in Pakistan",
    "Supreme Court practitioners Lahore"
  ],
  openGraph: {
    title: "Meet Our Trial Advocates & Of Counsel | Jus & Lay Law",
    description: "Browse the directory of senior trial advocates, commercial consultants, and of-counsel attorneys at Jus & Lay Law Conglomerate representing clients in Pakistan's High Courts.",
    url: "https://jusandlay.com/team",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Advocates of Jus & Lay Law Conglomerate",
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
        "item": "https://jusandlay.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Team",
        "item": "https://jusandlay.com/team"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TeamPage />
    </>
  );
}
