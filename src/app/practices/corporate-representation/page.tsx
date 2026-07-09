import type { Metadata } from "next";
import CorporateRepresentationPage from "./CorporateRepresentationClient";

export const metadata: Metadata = {
  title: "Corporate & Commercial Law Specialists | Jus & Lay Law Conglomerate",
  description: "Expert Corporate & Commercial lawyers in Pakistan specializing in SECP company registration, M&A, regulatory compliance, joint ventures, and High Court advocacy.",
  alternates: {
    canonical: "https://jusandlay.com/practices/corporate-representation/",
  },
  openGraph: {
    title: "Corporate & Commercial Law Specialists | Jus & Lay Law Conglomerate",
    description: "Expert Corporate & Commercial lawyers in Pakistan specializing in SECP company registration, M&A, regulatory compliance, joint ventures, and High Court advocacy.",
    url: "https://jusandlay.com/practices/corporate-representation/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Corporate Representation Logo",
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
        "name": "Corporate & Commercial Law",
        "item": "https://jusandlay.com/practices/corporate-representation/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CorporateRepresentationPage />
    </>
  );
}
