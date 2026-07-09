import type { Metadata } from "next";
import LitigationResolutionPage from "./LitigationResolutionClient";

export const metadata: Metadata = {
  title: "Litigation & Alternative Dispute Resolution | Jus & Lay Law Conglomerate",
  description: "Formidable Supreme Court and High Court trial advocates in Pakistan. Specialized in commercial disputes, stay writs, stay orders, and international arbitration.",
  alternates: {
    canonical: "https://jusandlay.com/practices/litigation-resolution/",
  },
  openGraph: {
    title: "Litigation & Alternative Dispute Resolution | Jus & Lay Law Conglomerate",
    description: "Formidable Supreme Court and High Court trial advocates in Pakistan. Specialized in commercial disputes, stay writs, stay orders, and international arbitration.",
    url: "https://jusandlay.com/practices/litigation-resolution/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg",
        width: 800,
        height: 600,
        alt: "Litigation and Dispute Resolution",
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
        "name": "Litigation & Dispute Resolution",
        "item": "https://jusandlay.com/practices/litigation-resolution/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LitigationResolutionPage />
    </>
  );
}
