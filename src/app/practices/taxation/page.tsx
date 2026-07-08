import type { Metadata } from "next";
import TaxationPage from "./TaxationClient";

export const metadata: Metadata = {
  title: "Corporate Taxation & FBR Litigation | Jus & Lay Law Conglomerate",
  description: "Specialist tax lawyers in Pakistan. Expertise in corporate tax filing, provincial sales tax (PRA/SRB) audits, and High Court tax stay appeals.",
  alternates: {
    canonical: "https://juslay.com/practices/taxation/",
  },
  openGraph: {
    title: "Corporate Taxation & FBR Litigation | Jus & Lay Law Conglomerate",
    description: "Specialist tax lawyers in Pakistan. Expertise in corporate tax filing, provincial sales tax (PRA/SRB) audits, and High Court tax stay appeals.",
    url: "https://juslay.com/practices/taxation/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg",
        width: 800,
        height: 600,
        alt: "Taxation and FBR Litigation",
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
        "name": "Taxation",
        "item": "https://juslay.com/practices/taxation/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TaxationPage />
    </>
  );
}
