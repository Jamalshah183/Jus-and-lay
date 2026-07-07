import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Jus & Lay Law Conglomerate | Premium Legal Advisory & Elite Counsel",
  description: "Supreme corporate counsel, banking litigation defense, commercial advice, and nationwide trials before the High Courts & Supreme Court of Pakistan.",
  icons: {
    icon: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        sizes: "180x180",
        type: "image/png",
      }
    ],
    shortcut: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
  },
  openGraph: {
    title: "Jus & Lay Law Conglomerate | Premium Legal Advisory & Elite Counsel",
    description: "Supreme corporate counsel, banking litigation defense, commercial advice, and nationwide trials before the High Courts & Supreme Court of Pakistan.",
    url: "https://juslay.com",
    siteName: "Jus & Lay Law Conglomerate",
    images: [
      {
        url: "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
        width: 800,
        height: 600,
        alt: "Jus & Lay Law Conglomerate Logo",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jus & Lay Law Conglomerate | Premium Legal Advisory & Elite Counsel",
    description: "Supreme corporate counsel, banking litigation defense, commercial advice, and nationwide trials before the High Courts & Supreme Court of Pakistan.",
    images: ["https://images.pexels.com/photos/38052959/pexels-photo-38052959.png"],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Explicitly defined favicons for Google's favicon crawler */}
        <link rel="icon" href="https://images.pexels.com/photos/38052959/pexels-photo-38052959.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="https://images.pexels.com/photos/38052959/pexels-photo-38052959.png" sizes="96x96" type="image/png" />
        <link rel="apple-touch-icon" href="https://images.pexels.com/photos/38052959/pexels-photo-38052959.png" sizes="180x180" />
        
        {/* Schema.org Structured Data for Google Search Rich Snippets, Logo, and Internal Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Jus & Lay Law Conglomerate",
                "alternateName": ["Jus & Lay", "Jus & Lay Law"],
                "url": "https://juslay.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://juslay.com/?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Jus & Lay Law Conglomerate",
                "url": "https://juslay.com",
                "logo": "https://images.pexels.com/photos/38052959/pexels-photo-38052959.png",
                "description": "Supreme corporate counsel, banking litigation defense, commercial advice, and nationwide trials before the High Courts & Supreme Court of Pakistan.",
                "sameAs": [
                  "https://wa.me/923218520085"
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Jus & Lay Law Conglomerate Sitelinks",
                "description": "Quick links to core sections of the elite legal advisory portal.",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "About Chambers",
                    "url": "https://juslay.com/#about",
                    "description": "Learn about our prestigious law chambers, high court advocates, and our dedication to elite counsel."
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Our Services & Practices",
                    "url": "https://juslay.com/#firm-profile",
                    "description": "Explore our specialized legal fields, including corporate advisory, civil trials, and banking litigation defense."
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Of Counsel Team",
                    "url": "https://juslay.com/#team",
                    "description": "Meet our esteemed legal team and nationwide trial advocates representing clients in high courts."
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Contact Counsel",
                    "url": "https://juslay.com/#contact",
                    "description": "Get in touch directly with our direct support, scheduled consultations, and primary legal consultants."
                  },
                  {
                    "@type": "ListItem",
                    "position": 5,
                    "name": "Client Portal",
                    "url": "https://juslay.com/#client-login",
                    "description": "Access the secure Client Case Vault, read legal documents, and track court hearings of your active cases."
                  },
                  {
                    "@type": "ListItem",
                    "position": 6,
                    "name": "Admin Portal",
                    "url": "https://juslay.com/#admin-login",
                    "description": "Advocate administration portal for case registrations, document archiving, and schedule management."
                  }
                ]
              },
              {
                "@context": "https://schema.org",
                "@type": "SiteNavigationElement",
                "name": "Navigation Menu",
                "hasPart": [
                  {
                    "@type": "WebPage",
                    "name": "About Chambers",
                    "url": "https://juslay.com/#about"
                  },
                  {
                    "@type": "WebPage",
                    "name": "Our Services",
                    "url": "https://juslay.com/#firm-profile"
                  },
                  {
                    "@type": "WebPage",
                    "name": "Of Counsel Team",
                    "url": "https://juslay.com/#team"
                  },
                  {
                    "@type": "WebPage",
                    "name": "Client Portal",
                    "url": "https://juslay.com/#client-login"
                  },
                  {
                    "@type": "WebPage",
                    "name": "Admin Portal",
                    "url": "https://juslay.com/#admin-login"
                  }
                ]
              }
            ])
          }}
        />
      </head>
      <body className="antialiased bg-[#070e1b] text-white">
        {children}
      </body>
    </html>
  );
}
