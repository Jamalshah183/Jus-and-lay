import type { Metadata } from "next";
import EnvironmentalRegulatoryPage from "./EnvironmentalRegulatoryClient";

export const metadata: Metadata = {
  title: "Environmental & Regulatory Law Compliance | Jus & Lay Law Conglomerate",
  description: "Expert environmental and municipal zoning clearance lawyers in Pakistan. Guiding enterprises through EPA clearance, Initial Environmental Examinations, and Environmental Protection Tribunal appeals.",
  alternates: {
    canonical: "https://juslay.com/practices/environmental-regulatory/",
  },
  openGraph: {
    title: "Environmental & Regulatory Law Compliance | Jus & Lay Law Conglomerate",
    description: "Expert environmental and municipal zoning clearance lawyers in Pakistan. Guiding enterprises through EPA clearance, Initial Environmental Examinations, and Environmental Protection Tribunal appeals.",
    url: "https://juslay.com/practices/environmental-regulatory/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/7781900/pexels-photo-7781900.jpeg",
        width: 800,
        height: 600,
        alt: "Environmental & Regulatory Law",
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
        "name": "Environmental & Regulatory Law",
        "item": "https://juslay.com/practices/environmental-regulatory/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EnvironmentalRegulatoryPage />
    </>
  );
}
