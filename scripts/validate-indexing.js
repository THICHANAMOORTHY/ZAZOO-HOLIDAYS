import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "../dist")

let errors = 0
function assert(condition, message) {
  if (!condition) {
    console.error("❌ FAIL:", message)
    errors++
  } else {
    console.log("✅ PASS:", message)
  }
}

console.log("── TASK 1: ROBOTS.TXT VALIDATION ──")
const robots = fs.readFileSync(path.join(distDir, "robots.txt"), "utf8")
assert(robots.includes("User-agent: *"), "robots.txt contains User-agent: *")
assert(robots.includes("Allow: /"), "robots.txt allows root")
assert(robots.includes("Allow: /assets/"), "robots.txt allows assets")
assert(robots.includes("Disallow: /admin"), "robots.txt disallows /admin")
assert(robots.includes("Sitemap: https://zazoo1.vercel.app/sitemap.xml"), "robots.txt points to correct sitemap URL")

console.log("\n── TASK 2: XML SITEMAP VALIDATION ──")
const sitemap = fs.readFileSync(path.join(distDir, "sitemap.xml"), "utf8")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/</loc>"), "Sitemap includes homepage")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/services/college-tours</loc>"), "Sitemap includes /services/college-tours")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/services/school-tours</loc>"), "Sitemap includes /services/school-tours")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/services/family-trips</loc>"), "Sitemap includes /services/family-trips")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/services/corporate-tours</loc>"), "Sitemap includes /services/corporate-tours")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/services/unofficial-trips</loc>"), "Sitemap includes /services/unofficial-trips")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/destinations/ooty</loc>"), "Sitemap includes /destinations/ooty")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/destinations/kodaikanal</loc>"), "Sitemap includes /destinations/kodaikanal")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/destinations/munnar</loc>"), "Sitemap includes /destinations/munnar")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/destinations/coorg</loc>"), "Sitemap includes /destinations/coorg")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/privacy</loc>"), "Sitemap includes /privacy")
assert(sitemap.includes("<loc>https://zazoo1.vercel.app/terms</loc>"), "Sitemap includes /terms")
assert(!sitemap.includes("/admin"), "Sitemap excludes /admin")
assert(!sitemap.includes("localhost"), "Sitemap excludes localhost")

console.log("\n── TASK 3 & 4: CANONICAL, META & STRUCTURED DATA ──")
const testPages = [
  { file: "index.html", url: "https://zazoo1.vercel.app/" },
  { file: "services/college-tours/index.html", url: "https://zazoo1.vercel.app/services/college-tours" },
  { file: "services/school-tours/index.html", url: "https://zazoo1.vercel.app/services/school-tours" },
  { file: "services/family-trips/index.html", url: "https://zazoo1.vercel.app/services/family-trips" },
  { file: "services/corporate-tours/index.html", url: "https://zazoo1.vercel.app/services/corporate-tours" },
  { file: "services/unofficial-trips/index.html", url: "https://zazoo1.vercel.app/services/unofficial-trips" },
  { file: "destinations/ooty/index.html", url: "https://zazoo1.vercel.app/destinations/ooty" },
  { file: "destinations/kodaikanal/index.html", url: "https://zazoo1.vercel.app/destinations/kodaikanal" },
  { file: "destinations/munnar/index.html", url: "https://zazoo1.vercel.app/destinations/munnar" },
  { file: "destinations/coorg/index.html", url: "https://zazoo1.vercel.app/destinations/coorg" },
]

for (const p of testPages) {
  const filePath = path.join(distDir, p.file)
  assert(fs.existsSync(filePath), `Static file exists: ${p.file}`)
  const html = fs.readFileSync(filePath, "utf8")

  assert(html.includes(`<link rel="canonical" href="${p.url}" />`), `Canonical URL verified: ${p.url}`)
  assert(html.includes(`<meta property="og:url" content="${p.url}" />`), `og:url matches: ${p.url}`)
  assert(html.includes('<meta name="robots" content="index, follow" />'), `Indexable robots tag verified for ${p.file}`)

  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert(Boolean(jsonLdMatch), `JSON-LD structured data found in ${p.file}`)
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1])
      assert(Boolean(parsed["@context"]), `Valid JSON-LD Schema syntax in ${p.file}`)
    } catch (e) {
      assert(false, `JSON parse error in ${p.file}: ${e.message}`)
    }
  }
}

console.log("\n── VERIFICATION SUMMARY ──")
if (errors === 0) {
  console.log("🎉 ALL TESTS PASSED! Zero indexing or canonical configuration errors.")
  process.exit(0)
} else {
  console.error(`💥 ${errors} tests failed!`)
  process.exit(1)
}
