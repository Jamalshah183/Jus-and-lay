import type { Metadata } from "next";
import EmploymentLabourPage from "./EmploymentLabourClient";

export const metadata: Metadata = {
  title: "Employment & Labour Law Advisory | Jus & Lay Law Conglomerate",
  description: "Premier labor compliance and employment defense lawyers in Pakistan. Specialized in EOBI audits, Social Security compliance, and Labour Court trials.",
  alternates: {
    canonical: "https://jusandlay.com/practices/employment-labour/",
  },
  openGraph: {
    title: "Employment & Labour Law Advisory | Jus & Lay Law Conglomerate",
    description: "Premier labor compliance and employment defense lawyers in Pakistan. Specialized in EOBI audits, Social Security compliance, and Labour Court trials.",
    url: "https://jusandlay.com/practices/employment-labour/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
        width: 800,
        height: 600,
        alt: "Employment and Labour Law",
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
        "name": "Employment & Labour Law",
        "item": "https://jusandlay.com/practices/employment-labour/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EmploymentLabourPage />
    </>
  );
}
