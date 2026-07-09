import { COMPANY_DETAILS } from "@/lib/constants";

export const SITE_CONFIG = {
  titleTemplate: "%s | Vivaldi Foods Ltd",
  defaultTitle: "Vivaldi Foods Ltd | Premium Volta Honey in Ghana",
  defaultDescription:
    "Shop 100% pure, raw, and responsibly packaged Volta honey from Vivaldi Foods Ltd. Serving retail, wholesale, and bulk agribusiness customers across Accra and Ghana.",
  siteUrl: "https://vivaldifoodsltd.com",
  ogImage: "/images/products.png",
  keywords: [
    "Vivaldi Foods Ltd",
    "Volta honey",
    "Ghana honey manufacturer",
    "pure honey Ghana",
    "premium organic honey Accra",
    "wholesale honey suppliers Ghana",
    "raw honey delivery Accra",
    "honey packaging factory Ghana",
    "Volta Premium Honey"
  ],
  locale: "en_GH",
  twitterHandle: "@vivaldifoods",
};

export function constructMetadata(title?: string, description?: string, path = "/") {
  // SEO FIX: Fixed the title calculation string so it doesn't double-render the company brand suffix name
  const fullTitle = title
    ? SITE_CONFIG.titleTemplate.replace("%s", title)
    : SITE_CONFIG.defaultTitle;

  const fullDesc = description || SITE_CONFIG.defaultDescription;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}${canonicalPath}`;
  const ogImageUrl = `${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`;

  // Strip phone non-digits cleanly for Schema telephone compatibility
  const numericPhone = COMPANY_DETAILS.phone.replace(/\D/g, "");

  return {
    title: fullTitle,
    // Unified meta attributes array mapped cleanly for modern engine injectors
    meta: [
      { name: "description", content: fullDesc },
      { name: "keywords", content: SITE_CONFIG.keywords.join(", ") },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "theme-color", content: "#4a372c" }, // Matches your lightened warm brand canvas footer color code

      /* Open Graph Social Profiles */
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: fullDesc },
      { property: "og:type", content: path === "/" ? "website" : "article" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImageUrl },
      { property: "og:site_name", content: COMPANY_DETAILS.name },
      { property: "og:locale", content: SITE_CONFIG.locale },

      /* Twitter Card Engine Elements */
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE_CONFIG.twitterHandle },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: fullDesc },
      { name: "twitter:image", content: ogImageUrl },
    ],
    links: [
      { rel: "canonical", href: canonicalUrl }
    ],

    // SEO POWER-UP: Advanced Local Schema structures map you onto regional Google search feeds effortlessly
    structuredData: {
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
      "name": COMPANY_DETAILS.name,
      "url": SITE_CONFIG.siteUrl,
      "logo": `${SITE_CONFIG.siteUrl}/assets/images/Vivaldi-logo.jpg`,
      "image": ogImageUrl,
      "description": fullDesc,
      "email": COMPANY_DETAILS.email,
      "telephone": `+${numericPhone}`,
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": COMPANY_DETAILS.address,
        "addressLocality": "Spintex, Accra",
        "addressRegion": "Greater Accra",
        "addressCountry": "GH"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "5.6631", // Matches your coordinate point mappings on the contact dashboard
        "longitude": "-0.0381"
      },
      "sameAs": [
        COMPANY_DETAILS.socials.facebook,
        COMPANY_DETAILS.socials.tikTok,
        COMPANY_DETAILS.socials.instagram,
        COMPANY_DETAILS.socials.linkedin
      ]
    }
  };
}
