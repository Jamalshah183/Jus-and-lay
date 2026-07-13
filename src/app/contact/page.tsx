import type { Metadata } from "next";
import ContactPage from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Jus and Lay Law Conglomerate | Office & Consultation",
  description: "Get in touch with Jus and Lay Law Conglomerate (Jus & Lay) in Lahore, Pakistan. Schedule an elite consultation for corporate or banking trial advocacy.",
  alternates: {
    canonical: "https://jusandlay.com/contact",
  },
  keywords: [
    "Jus and Lay",
    "Jus and Lay contact",
    "Jus and Lay Law Conglomerate",
    "Contact corporate lawyers Lahore",
    "Law firm telephone number Pakistan",
    "Lahore High Court advocate address",
    "Jus and Lay office location Lahore",
    "Hire criminal defense lawyer Pakistan",
    "Book tax consultation Lahore"
  ],
  openGraph: {
    title: "Contact Our Law Chambers & Primary Office | Jus & Lay Law",
    description: "Get in touch with Jus & Lay Law Conglomerate in Lahore, Pakistan. Schedule an elite legal consultation for corporate structuring, banking litigation, or high court trials.",
    url: "https://jusandlay.com/contact",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Contact Jus & Lay Law Conglomerate",
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
        "name": "Contact",
        "item": "https://jusandlay.com/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactPage />
    </>
  );
}
