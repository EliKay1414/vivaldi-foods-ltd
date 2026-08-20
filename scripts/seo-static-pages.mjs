import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(fileURLToPath(import.meta.url))
const distDir = join(root, "..", "dist")
const siteUrl = (process.env.VITE_SITE_URL || "https://vivaldifoodsltd.com").replace(/\/$/, "")

const routes = [
  {
    path: "/",
    title: "Vivaldi Foods Ltd | Premium Food Manufacturers Ghana",
    description:
      "Responsibly packaged premium food products from Vivaldi Foods Ltd. Top suppliers of Volta Premium Honey for retail, wholesale, and bulk business across Ghana.",
  },
  {
    path: "/about",
    title: "Our Story & Core Values | Vivaldi Foods Ltd",
    description:
      "Discover the story behind Vivaldi Foods Ltd. Learn about our strict quality standards, sustainable beekeeping partnerships, and premium Volta Honey processing factory in Adaklu, Ghana.",
  },
  {
    path: "/products",
    title: "Official Products Catalog | Vivaldi Foods Ltd",
    description:
      "Explore the full food and agricultural brand selection from Vivaldi Foods Ltd. Shop our 100% pure Volta Premium Honey alongside our expanding premium product collections available across Ghana.",
  },
  {
    path: "/quality",
    title: "Quality Controls & Food Safety Standards | Vivaldi Foods Ltd",
    description:
      "Learn about our strict quality assurance and safety protocols at Vivaldi Foods Ltd. We enforce a zero food adulteration check across every batch to provide pure honey you can trust.",
  },
  {
    path: "/factory",
    title: "Our Factory, Processing & FDA Standards | Vivaldi Foods Ltd",
    description:
      "Step inside the Vivaldi Foods Ltd honey processing factory. Discover how our modern, sterile facility in Sakumono / Community 18 adheres to strict FDA hygiene, filtration, and nutrients preservation protocols.",
  },
  {
    path: "/community-impact",
    title: "Community Impact & Beekeeping Development | Vivaldi Foods Ltd",
    description:
      "Partnering with the Volta and Oti Beekeepers Cooperative Union (VOBCU) to deliver agricultural training, sustainable livelihoods, and financial inclusion for rural farmers in Ghana.",
  },
  {
    path: "/team",
    title: "Our Leadership Team & Management | Vivaldi Foods Ltd",
    description:
      "Meet the dedicated management team, agribusiness specialists, and food safety experts leading Vivaldi Foods Ltd in delivering pure, natural honey products across Ghana.",
  },
  {
    path: "/services",
    title: "Food Production & Agribusiness Services | Vivaldi Foods Ltd",
    description:
      "Explore agribusiness solutions by Vivaldi Foods Ltd. We offer premium bulk honey production, safe contract food packaging, and commercial wholesale distribution across Ghana.",
  },
  {
    path: "/faq",
    title: "Frequently Asked Questions | Vivaldi Foods Ltd",
    description:
      "Find answers to common questions about Vivaldi Foods Ltd. Learn about our 100% pure honey sourcing in Adaklu, wholesale orders, FDA standards compliance, and international bulk supply.",
  },
  {
    path: "/our-partners",
    title: "Where to Buy & Retail Stockists | Vivaldi Foods Ltd",
    description:
      "Find out where to buy Volta Premium Honey across Ghana. Browse our verified list of local retail stockists, supermarkets, gas marts, and pharmacies in Accra, Spintex, Ho, Aflao, and Kpando.",
  },
  {
    path: "/contact",
    title: "Contact Us & Inquiries | Vivaldi Foods Ltd",
    description:
      "Get in touch with Vivaldi Foods Ltd. Call or WhatsApp for wholesale inquiries, bulk product distribution, and retail sales. Factory: Community 18 / Sakumono. Office: Spintex, Accra.",
  },
  {
    path: "/blog",
    title: "Vivaldi Insights & Corporate Blog | Vivaldi Foods Ltd",
    description:
      "Stay updated with Vivaldi Foods Ltd. Explore our latest blog posts, laboratory honey training articles, and sustainable development insights directly from our headquarters.",
  },
  {
    path: "/gallery",
    title: "Production Gallery & Visual Journey | Vivaldi Foods Ltd",
    description:
      "Explore the visual journey of Vivaldi Foods Ltd. View high-quality images of our sustainable beekeeping apiaries in the Volta Region, micro-mesh filtration setups, and sterile honey bottling factory.",
  },
]

function applyMeta(html, { path, title, description }) {
  const canonical = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`
  let next = html
  next = next.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
  next = next.replace(
    /(<meta\s+name="description"\s+content=")[^"]*(")/i,
    `$1${description}$2`,
  )
  next = next.replace(
    /(<meta\s+property="og:title"\s+content=")[^"]*(")/i,
    `$1${title}$2`,
  )
  next = next.replace(
    /(<meta\s+property="og:description"\s+content=")[^"]*(")/i,
    `$1${description}$2`,
  )
  next = next.replace(
    /(<meta\s+property="og:url"\s+content=")[^"]*(")/i,
    `$1${canonical}$2`,
  )
  next = next.replace(
    /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i,
    `$1${title}$2`,
  )
  next = next.replace(
    /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i,
    `$1${description}$2`,
  )
  next = next.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/i,
    `$1${canonical}$2`,
  )
  return next
}

const shell = await readFile(join(distDir, "index.html"), "utf8")

for (const route of routes) {
  const html = applyMeta(shell, route)
  if (route.path === "/") {
    await writeFile(join(distDir, "index.html"), html)
    continue
  }

  const outFile = join(distDir, route.path.slice(1), "index.html")
  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, html)
}

console.log(`Wrote SEO HTML for ${routes.length} routes`)
