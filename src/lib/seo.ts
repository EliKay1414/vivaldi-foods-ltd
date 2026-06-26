import { COMPANY_DETAILS } from "@/lib/constants";

export const SITE_CONFIG = {
  titleTemplate: "%s | Vivaldi Foods Ltd",
  defaultTitle: "Vivaldi Foods Ltd | Premium Volta Honey in Ghana",
  defaultDescription:
    "Shop pure, raw, and responsibly packaged Volta honey from Vivaldi Foods Ltd, a Ghanaian food brand serving retail, wholesale, and household customers.",
  siteUrl: "https://vivaldifoodsltd.com",
  ogImage: "/images/products.png",
  keywords: [
    "Vivaldi Foods Ltd",
    "Volta honey",
    "Ghana honey",
    "pure honey Ghana",
    "premium honey",
    "wholesale honey Ghana",
    "raw honey",
    "food packaging Ghana",
  ],
  locale: "en_GH",
  twitterHandle: "@vivaldifoods",
};

export function constructMetadata(title?: string, description?: string, path = "/") {
  const pageTitle = title || SITE_CONFIG.defaultTitle;
  const fullTitle = title
    ? SITE_CONFIG.titleTemplate.replace("%s", pageTitle)
    : SITE_CONFIG.defaultTitle;
  const fullDesc = description || SITE_CONFIG.defaultDescription;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}${canonicalPath}`;
  const ogImageUrl = `${SITE_CONFIG.siteUrl}${SITE_CONFIG.ogImage}`;

  return {
    title: fullTitle,
    meta: [
      { name: "description", content: fullDesc },
      { name: "keywords", content: SITE_CONFIG.keywords.join(", ") },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#2B1E17" },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: fullDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImageUrl },
      { property: "og:site_name", content: COMPANY_DETAILS.name },
      { property: "og:locale", content: SITE_CONFIG.locale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SITE_CONFIG.twitterHandle },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: fullDesc },
      { name: "twitter:image", content: ogImageUrl },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: COMPANY_DETAILS.name,
      url: SITE_CONFIG.siteUrl,
      logo: ogImageUrl,
      description: fullDesc,
      email: COMPANY_DETAILS.email,
      telephone: COMPANY_DETAILS.phone,
      address: COMPANY_DETAILS.address,
      sameAs: [
        COMPANY_DETAILS.socials.facebook,
        COMPANY_DETAILS.socials.tikTok,
        COMPANY_DETAILS.socials.instagram,
        COMPANY_DETAILS.socials.linkedin,
      ],
    },
  };
}
