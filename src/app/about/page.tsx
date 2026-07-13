import type { Metadata } from "next";
import AboutPage from "./AboutClient";

export const metadata: Metadata = {
  title: "About Jus and Lay Law Conglomerate | History & Leadership",
  description: "Learn about Jus and Lay Law Conglomerate (Jus & Lay), the premier corporate and civil litigation chambers in Pakistan. Directed by High Court advocates.",
  alternates: {
    canonical: "https://jusandlay.com/about",
  },
  keywords: [
    "Jus and Lay",
    "Jus and Lay Law Conglomerate",
    "About Jus and Lay",
    "Top law firm Pakistan",
    "Best corporate lawyers in Lahore",
    "High Court trial advocates Pakistan",
    "Supreme Court of Pakistan counsel",
    "Law chambers Lahore",
    "Senior legal consultants Pakistan"
  ],
  openGraph: {
    title: "About Our Law Firm & Senior Leadership | Jus & Lay Law",
    description: "Learn about Jus & Lay Law Conglomerate, the premier corporate and civil litigation chambers in Pakistan. Directed by esteemed High Court trials advocates.",
    url: "https://jusandlay.com/about",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "About Jus & Lay Law Conglomerate",
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
        "name": "About",
        "item": "https://jusandlay.com/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutPage />
    </>
  );
}
