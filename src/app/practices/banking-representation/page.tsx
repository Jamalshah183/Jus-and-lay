import type { Metadata } from "next";
import BankingRepresentationPage from "./BankingRepresentationClient";

export const metadata: Metadata = {
  title: "Banking & Finance Representation | Jus & Lay Law Conglomerate",
  description: "Supreme banking defense lawyers and loan recovery panel advocates in Pakistan. Serving Bank of Punjab, HBL, Bank Alfalah under Recovery of Finances Act 2001.",
  alternates: {
    canonical: "https://jusandlay.com/practices/banking-representation/",
  },
  openGraph: {
    title: "Banking & Finance Representation | Jus & Lay Law Conglomerate",
    description: "Supreme banking defense lawyers and loan recovery panel advocates in Pakistan. Serving Bank of Punjab, HBL, Bank Alfalah under Recovery of Finances Act 2001.",
    url: "https://jusandlay.com/practices/banking-representation/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Banking Representation Logo",
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
        "name": "Banking & Finance",
        "item": "https://jusandlay.com/practices/banking-representation/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BankingRepresentationPage />
    </>
  );
}
