import type { Metadata } from "next";
import ClientsPage from "./ClientsClient";

export const metadata: Metadata = {
  title: "Jus and Lay Clients & Sector Representation | Jus & Lay Law",
  description: "Browse the elite client portfolio and institutional partners of Jus and Lay Law Conglomerate (Jus & Lay) in Pakistan. High Court trial representations.",
  alternates: {
    canonical: "https://jusandlay.com/clients",
  },
  keywords: [
    "Jus and Lay",
    "Jus and Lay clients",
    "Jus and Lay Law Conglomerate",
    "Banking panel lawyers Pakistan",
    "Corporate legal advisors Lahore",
    "Institutional representation Pakistan",
    "Multinational company lawyers Lahore",
    "Government regulatory defense Pakistan",
    "Civil sector litigation advocates",
    "Best law firms Lahore corporate"
  ],
  openGraph: {
    title: "Our Institutional Clients & Sector Coverage | Jus & Lay Law",
    description: "Browse the elite client portfolio of Jus & Lay Law Conglomerate, Pakistan. We represent major banking institutions, multinational corporations, and civic sectors in High Courts.",
    url: "https://jusandlay.com/clients",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Clients of Jus & Lay Law Conglomerate",
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
        "name": "Clients",
        "item": "https://jusandlay.com/clients"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ClientsPage />
    </>
  );
}
