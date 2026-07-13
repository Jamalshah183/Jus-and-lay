import type { Metadata } from "next";
import PracticesPage from "./PracticesClient";

export const metadata: Metadata = {
  title: "Jus and Lay Practice Areas & Legal Spectrum | Jus & Lay Law",
  description: "Explore the comprehensive legal practices at Jus and Lay Law Conglomerate (Jus & Lay), Pakistan. Corporate, Banking Defense, Tax Appeals, and Civil trials.",
  alternates: {
    canonical: "https://jusandlay.com/practices",
  },
  keywords: [
    "Jus and Lay",
    "Jus and Lay practices",
    "Jus and Lay Law Conglomerate",
    "Corporate legal services Lahore",
    "Banking litigation defense Pakistan",
    "FBR tax appeal lawyers",
    "Civil trial advocates Lahore",
    "NAB and FIA defense lawyers Pakistan",
    "Labour court disputes Lahore",
    "Environmental tribunal lawyers Pakistan"
  ],
  openGraph: {
    title: "Our Specialized Legal Practices & Areas of Expertise | Jus & Lay Law",
    description: "Explore the comprehensive legal practices at Jus & Lay Law Conglomerate, Pakistan. Specialized desks for Corporate & Commercial, Banking Defense, FBR Tax Appeals, and Civil/Criminal Litigation.",
    url: "https://jusandlay.com/practices",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Practices of Jus & Lay Law Conglomerate",
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
        "name": "Practices",
        "item": "https://jusandlay.com/practices"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PracticesPage />
    </>
  );
}
