import type { Metadata } from "next";
import SitemapClient from "./SitemapClient";

export const metadata: Metadata = {
  title: "Website Directory & Sitemap | Jus & Lay Law Conglomerate",
  description: "Browse the complete architectural map of Jus & Lay Law Conglomerate, Pakistan. High Court and Supreme Court advocates specializing in corporate law, banking litigation, FBR tax appeals, white-collar NAB defense, and civil litigation.",
  alternates: {
    canonical: "https://jusandlay.com/sitemap/",
  },
  openGraph: {
    title: "Website Directory & Sitemap | Jus & Lay Law Conglomerate",
    description: "Browse the complete architectural map of Jus & Lay Law Conglomerate, Pakistan. High Court and Supreme Court advocates specializing in corporate law, banking litigation, FBR tax appeals, white-collar NAB defense, and civil litigation.",
    url: "https://jusandlay.com/sitemap/",
    siteName: "Jus & Lay Law Conglomerate",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Jus & Lay Law Conglomerate Directory Map",
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
        "name": "Sitemap",
        "item": "https://jusandlay.com/sitemap/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SitemapClient />
    </>
  );
}
