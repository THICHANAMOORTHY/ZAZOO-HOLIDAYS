import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "../dist")
const SITE_URL = "https://zazoo1.vercel.app"

const pages = [
  {
    path: "packages",
    title: "Tour Packages | ZAZOO Holidays",
    description: "Explore curated group tour packages to Ooty, Kodaikanal, Munnar, Coorg, Goa, and more from Tamil Nadu.",
    heading: "Tour Packages",
    body: "Discover our carefully planned travel packages for college industrial visits, school tours, family vacations, and corporate getaways.",
  },
  {
    path: "upcoming",
    title: "Upcoming Trips | ZAZOO Holidays",
    description: "Browse upcoming scheduled group departures and seasonal getaways to popular South Indian destinations.",
    heading: "Upcoming Trips",
    body: "Join our upcoming fixed departures to Ooty, Kodaikanal, Munnar, and Coorg. Transparent itineraries and guided coordination.",
  },
  {
    path: "plan",
    title: "Custom Trip Planner | ZAZOO Holidays",
    description: "Design a customized group trip itinerary tailored to your group size, budget, and travel preferences.",
    heading: "Custom Trip Planner",
    body: "Share your travel ideas, dates, and group details. We create personalized itineraries with reliable transport and comfortable stays.",
  },
  {
    path: "about",
    title: "About Us | ZAZOO Holidays",
    description: "Learn about ZAZOO Holidays — dedicated group travel planning from Tamil Nadu focusing on safety, comfort, and memories.",
    heading: "About ZAZOO Holidays",
    body: "We organize thoughtful, well-paced group travel experiences across Tamil Nadu, Kerala, and Karnataka. From college IVs to family holidays, we handle the logistics so you can enjoy the journey.",
  },
  {
    path: "contact",
    title: "Contact Us | ZAZOO Holidays",
    description: "Get in touch with ZAZOO Holidays via phone or WhatsApp to start planning your next group tour.",
    heading: "Contact ZAZOO Holidays",
    body: "Reach out to discuss your trip requirements. We are based in Tamil Nadu and operate trips across South India. Call or message us on WhatsApp.",
  },
  {
    path: "book",
    title: "Booking Enquiry | ZAZOO Holidays",
    description: "Send a booking enquiry for your upcoming group trip with ZAZOO Holidays.",
    heading: "Booking Enquiry",
    body: "Submit your travel enquiry to receive package details and price quotes for your group journey.",
  },
  // Specific package routes
  {
    path: "packages/ooty-blue-mountains",
    title: "Ooty Blue Mountains Tour Package | ZAZOO Holidays",
    description: "Ooty Blue Mountains sample itinerary with ZAZOO Holidays. Tea gardens, viewpoints, and cool mountain air.",
    heading: "Ooty Blue Mountains",
    body: "3 Days / 2 Nights tour package to Ooty, Tamil Nadu. Visit Botanical Gardens, Doddabetta Peak, Ooty Lake, and tea estates.",
  },
  {
    path: "packages/kodaikanal-adventure",
    title: "Kodaikanal Adventure Tour Package | ZAZOO Holidays",
    description: "Kodaikanal Adventure sample itinerary with ZAZOO Holidays. Forest trails, lake moments, and scenic walks.",
    heading: "Kodaikanal Adventure",
    body: "2 Days / 1 Night tour package to Kodaikanal, Tamil Nadu. Explore Kodai Lake, Coaker's Walk, Pine Forests, and waterfalls.",
  },
  {
    path: "packages/munnar-tea-trails",
    title: "Munnar Tea Trails Tour Package | ZAZOO Holidays",
    description: "Munnar Tea Trails sample itinerary with ZAZOO Holidays. Rolling tea estates, waterfalls, and mist-covered peaks.",
    heading: "Munnar Tea Trails",
    body: "3 Days / 2 Nights tour package to Munnar, Kerala. Experience Eravikulam National Park, Mattupetty Dam, and sprawling tea plantations.",
  },
  {
    path: "packages/coorg-coffee-country",
    title: "Karnataka Coorg Adventure Tour Package | ZAZOO Holidays",
    description: "Karnataka Coorg Adventure sample itinerary with ZAZOO Holidays. River rafting, coffee estates, and waterfalls.",
    heading: "Karnataka Coorg Adventure",
    body: "3 Days / 2 Nights tour package to Coorg, Karnataka. Enjoy Barapole river rafting, coffee plantation walks, Abbey Falls, and Raja's Seat.",
  },
  {
    path: "packages/vagamon-cloud-escape",
    title: "Vagamon Cloud Escape Tour Package | ZAZOO Holidays",
    description: "Vagamon Cloud Escape sample itinerary with ZAZOO Holidays. Pine forests, green meadows, and mountain serenity.",
    heading: "Vagamon Cloud Escape",
    body: "2 Days / 1 Night group trip to Vagamon, Kerala. Beautiful pine valleys, Kurisumala hills, and refreshing hill climate.",
  },
  {
    path: "packages/wayanad-wilderness",
    title: "Wayanad Wilderness Tour Package | ZAZOO Holidays",
    description: "Wayanad Wilderness sample itinerary with ZAZOO Holidays. Caves, waterfalls, and lush rainforest trails.",
    heading: "Wayanad Wilderness",
    body: "3 Days / 2 Nights tour to Wayanad, Kerala. Ideal for corporate and family groups seeking nature, trekking, and heritage.",
  },
  {
    path: "packages/kerala-backwaters",
    title: "Kerala Backwaters Tour Package | ZAZOO Holidays",
    description: "Kerala Backwaters sample itinerary with ZAZOO Holidays. Houseboats, calm lagoons, and coastal cuisine.",
    heading: "Kerala Backwaters",
    body: "4 Days / 3 Nights relaxing journey through the backwaters and coconut groves of Alappuzha, Kerala.",
  },
  {
    path: "packages/goa-coastal-break",
    title: "Goa Coastal Break Tour Package | ZAZOO Holidays",
    description: "Goa Coastal Break sample itinerary with ZAZOO Holidays. Beaches, heritage churches, and vibrant group vibes.",
    heading: "Goa Coastal Break",
    body: "4 Days / 3 Nights beach and heritage tour in Goa for friends, college groups, and unofficial getaways.",
  },
  {
    path: "packages/yercaud-weekender",
    title: "Yercaud Weekender Tour Package | ZAZOO Holidays",
    description: "Yercaud Weekender sample itinerary with ZAZOO Holidays. Lake boating, coffee orchards, and Shevaroy hills.",
    heading: "Yercaud Weekender",
    body: "2 Days / 1 Night weekend getaway to Yercaud, Tamil Nadu. Quick and scenic hill retreat from Salem and surrounding regions.",
  },
]

const homePrerenderHtml = `
  <main>
    <header class="hero">
      <div class="hero-copy">
        <span class="pill">JOURNEYS MADE PERSONAL</span>
        <h1>Your Journey. Our Adventure.</h1>
        <p>Discover unforgettable journeys with ZAZOO Holidays. From college trips to family vacations, we make every journey memorable with thoughtfully arranged travel and accommodation.</p>
        <div>
          <a href="/packages" class="button">Explore packages</a>
          <a href="/plan" class="button">Plan your trip</a>
        </div>
      </div>
    </header>

    <section class="section">
      <div class="heading">
        <span>Find your kind of trip</span>
        <h2>Explore Our Travel Experiences</h2>
        <p>Every journey has a story. Choose your next adventure with ZAZOO Holidays.</p>
      </div>
      <div class="category-grid">
        <article class="category-card">
          <small>01</small>
          <h3>College IV</h3>
          <p>Educational tours, industrial visits, and unforgettable college group experiences organized with care.</p>
          <a href="/packages?category=College%20IV">Explore College IV &rarr;</a>
        </article>
        <article class="category-card">
          <small>02</small>
          <h3>School Tours</h3>
          <p>Safe, organized, and memorable educational trips designed for school students.</p>
          <a href="/packages?category=School%20Tours">Explore School Tours &rarr;</a>
        </article>
        <article class="category-card">
          <small>03</small>
          <h3>Family Trips</h3>
          <p>Enjoy beautiful destinations, comfortable travel, and memorable family vacations.</p>
          <a href="/packages?category=Family%20Trips">Explore Family Trips &rarr;</a>
        </article>
        <article class="category-card">
          <small>04</small>
          <h3>Corporate Tours</h3>
          <p>Professional travel arrangements, employee outings, and team-building experiences.</p>
          <a href="/packages?category=Corporate%20Tours">Explore Corporate Tours &rarr;</a>
        </article>
        <article class="category-card">
          <small>05</small>
          <h3>Unofficial Trips</h3>
          <p>Adventure trips, weekend getaways, and unforgettable journeys with friends.</p>
          <a href="/packages?category=Unofficial%20Trips">Explore Unofficial Trips &rarr;</a>
        </article>
      </div>
    </section>

    <section class="section">
      <div class="heading">
        <span>Where we go</span>
        <h2>Popular destinations from Tamil Nadu</h2>
        <p>Every destination below is reachable from Tamil Nadu by road or rail, making them ideal for group travel without the stress of flights.</p>
      </div>
      <div class="dest-grid">
        <article class="dest-card">
          <div class="dest-card-header">
            <span>Tamil Nadu</span>
          </div>
          <h3>Ooty (Udhagamandalam)</h3>
          <p>Ooty sits at around 2,240 m in the Nilgiris and is one of the most visited hill stations in South India. The town is known for its tea and eucalyptus plantations, Ooty Lake, Botanical Gardens, and cool climate throughout the year. It is a comfortable journey from Coimbatore and an easy choice for first-time group trips.</p>
        </article>
        <article class="dest-card">
          <div class="dest-card-header">
            <span>Tamil Nadu</span>
          </div>
          <h3>Kodaikanal</h3>
          <p>Kodaikanal is a quiet hill town in the Palani Hills at around 2,133 m. The star-shaped Kodai Lake, Coaker's Walk, Pine Forests, and Silver Cascade Falls are well-known spots. It suits groups looking for a relaxed pace with scenic walks and boat rides rather than a busy tourist circuit.</p>
        </article>
        <article class="dest-card">
          <div class="dest-card-header">
            <span>Kerala</span>
          </div>
          <h3>Munnar</h3>
          <p>Munnar in the Western Ghats is famous for its rolling tea estates, misty mornings, and biodiversity. Eravikulam National Park, Mattupetty Dam, and Top Station are popular stops. The cooler climate and scenic roads make it a refreshing option for family and college groups from Tamil Nadu.</p>
        </article>
        <article class="dest-card">
          <div class="dest-card-header">
            <span>Karnataka</span>
          </div>
          <h3>Coorg (Madikeri)</h3>
          <p>Coorg in Karnataka is known for its coffee and spice plantations, the Barapole River, Abbey Falls, and Raja's Seat viewpoint. The region's hilly terrain supports activities like river rafting and plantation walks. It is a good fit for groups seeking a mix of nature and adventure.</p>
        </article>
      </div>
    </section>

    <section class="section tinted">
      <div class="heading">
        <span>Who we plan for</span>
        <h2>Trip types we organise</h2>
        <p>We work with different kinds of groups and try to match the plan to the people, not the other way around.</p>
      </div>
      <div class="types-grid">
        <div class="type-card">
          <h3>College Tours & IV</h3>
          <p>College tours and industrial visits are planned in alignment with semester schedules and curriculum requirements. We coordinate comfortable group transportation, vetted dormitory or hotel accommodation, and on-ground logistics so faculty and student coordinators can focus on learning and bonding without travel hassles.</p>
        </div>
        <div class="type-card">
          <h3>School Tours</h3>
          <p>School educational trips demand thorough attention to safety, hygiene, nutrition, and age-appropriate pacing. We collaborate closely with school faculties to construct balanced itineraries with cultural and natural landmarks, safe coach transport, and dedicated ground support.</p>
        </div>
        <div class="type-card">
          <h3>Family Trips</h3>
          <p>Family vacations span multiple generations with varying energy levels and preferences. We arrange private vehicles, comfortable family-friendly stays, and relaxed daily plans that blend sightseeing with plenty of rest so grandparents and children alike travel at ease.</p>
        </div>
        <div class="type-card">
          <h3>Corporate Tours</h3>
          <p>Corporate outings, leadership offsites, and team-building getaways are customized to your team size and objectives. We manage end-to-end conference halls, outdoor recreational activities, reliable transfers, and quality dining to ensure a productive and refreshing retreat.</p>
        </div>
        <div class="type-card">
          <h3>Unofficial Trips</h3>
          <p>Unofficial trips, friends' road journeys, and spontaneous weekend escapes are crafted with budget flexibility, trekking, campfires, and scenic viewpoints in mind. We suggest authentic homestays and offbeat trails, balancing exciting adventures with relaxed free time.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="heading">
        <span>How we work</span>
        <h2>From enquiry to travel — a simple process</h2>
        <p>We keep the process straightforward so there is no confusion between expressing interest and actual booking.</p>
      </div>
      <div class="how-grid">
        <div class="how-card">
          <span class="how-step">1</span>
          <h3>Share your plan</h3>
          <p>Tell us your group size, destination preference, travel dates, and any specific requirements. You can do this through the contact form, the trip planner, or directly on WhatsApp.</p>
        </div>
        <div class="how-card">
          <span class="how-step">2</span>
          <h3>Receive a custom itinerary</h3>
          <p>We put together a sample itinerary based on your inputs. This includes suggested stops, estimated travel times, and accommodation options. We share it for review before anything is finalised.</p>
        </div>
        <div class="how-card">
          <span class="how-step">3</span>
          <h3>Discuss and adjust</h3>
          <p>If anything needs to change — dates, stops, budget adjustments — we work through it with you. The itinerary is not fixed until you are happy with it.</p>
        </div>
        <div class="how-card">
          <span class="how-step">4</span>
          <h3>Confirm and travel</h3>
          <p>Once the plan is agreed, we move to confirmation. During the trip, we stay in contact and handle any changes that come up on the road.</p>
        </div>
      </div>
    </section>

    <section class="section tinted">
      <div class="heading">
        <span>Common questions</span>
        <h2>Frequently asked questions</h2>
        <p>Answers to questions we hear often. If yours is not here, reach out on WhatsApp or through the contact page.</p>
      </div>
      <div class="faq-list">
        <div class="faq-item">
          <h3>Do you operate only within Tamil Nadu?</h3>
          <p>No. While we are based in Tamil Nadu and most enquiries come from there, we plan trips to destinations across South India including Kerala and Karnataka. The starting point for most trips is from Tamil Nadu.</p>
        </div>
        <div class="faq-item">
          <h3>Is this a booking platform or a travel agency?</h3>
          <p>ZAZOO Holidays is a travel planning service. We work directly with groups to plan and coordinate trips. We are not an online booking platform — every trip is handled through direct communication.</p>
        </div>
        <div class="faq-item">
          <h3>Can you plan a trip for a small group?</h3>
          <p>Yes. Group size is not a fixed requirement. We have worked with groups of varying sizes. The plan and logistics are adjusted accordingly.</p>
        </div>
        <div class="faq-item">
          <h3>Are the sample packages on the website fixed itineraries?</h3>
          <p>No. The packages shown are sample itineraries meant to give an idea of what a trip to that destination could look like. Every trip is planned based on the specific group's needs, dates, and preferences.</p>
        </div>
        <div class="faq-item">
          <h3>How do I get a price for a trip?</h3>
          <p>Pricing depends on group size, accommodation choice, travel dates, and the specific itinerary. We share pricing after discussing your requirements. You can reach us via WhatsApp or through the contact form.</p>
        </div>
        <div class="faq-item">
          <h3>Do you handle transport arrangements?</h3>
          <p>Yes. Transport is typically part of the trip plan. We coordinate vehicle arrangements based on group size and route. Details are discussed during the planning process.</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <div>
        <span>Ready when you are</span>
        <h2>Where should we go next?</h2>
        <p>Tell us the group, the dates and the dream. We will help shape the rest.</p>
      </div>
      <a href="/plan" class="button">Plan my trip &rarr;</a>
    </section>
  </main>
`

function run() {
  const templatePath = path.join(distDir, "index.html")
  if (!fs.existsSync(templatePath)) {
    console.error("dist/index.html not found! Run vite build first.")
    process.exit(1)
  }

  const baseHtml = fs.readFileSync(templatePath, "utf8")

  // 1. Inject prerendered semantic body into the homepage index.html
  const updatedHomeHtml = baseHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${homePrerenderHtml}</div>`
  )
  fs.writeFileSync(templatePath, updatedHomeHtml, "utf8")
  console.log("✓ Homepage dist/index.html injected with semantic content")

  // 2. Generate per-page static HTML files with correct canonical, OG, Twitter, and meta tags
  for (const page of pages) {
    const pageUrl = `${SITE_URL}/${page.path}`
    const targetDir = path.join(distDir, page.path)
    fs.mkdirSync(targetDir, { recursive: true })

    const pagePrerenderBody = `
      <main class="page-container">
        <header class="page-hero">
          <h1>${page.heading}</h1>
          <p>${page.body}</p>
        </header>
        <section class="section">
          <p><a href="/" class="button">&larr; Back to Home</a> | <a href="/plan" class="button">Plan Your Trip</a></p>
        </section>
      </main>
    `

    let pageHtml = baseHtml
      // Canonical URL -> specific to this page!
      .replace(
        '<link rel="canonical" href="https://zazoo1.vercel.app/" />',
        `<link rel="canonical" href="${pageUrl}" />`
      )
      // og:url -> specific to this page!
      .replace(
        '<meta property="og:url" content="https://zazoo1.vercel.app/" />',
        `<meta property="og:url" content="${pageUrl}" />`
      )
      // title -> specific to this page!
      .replace(
        /<title>.*?<\/title>/,
        `<title>${page.title}</title>`
      )
      // og:title -> specific to this page!
      .replace(
        /<meta property="og:title" content=".*?">/,
        `<meta property="og:title" content="${page.title}">`
      )
      // twitter:title -> specific to this page!
      .replace(
        /<meta name="twitter:title" content=".*?" \/>/,
        `<meta name="twitter:title" content="${page.title}" />`
      )
      // description -> specific to this page!
      .replace(
        /<meta name="description" content=".*?" \/>/,
        `<meta name="description" content="${page.description}" />`
      )
      // og:description -> specific to this page!
      .replace(
        /<meta property="og:description" content=".*?" \/>/,
        `<meta property="og:description" content="${page.description}" />`
      )
      // twitter:description -> specific to this page!
      .replace(
        /<meta name="twitter:description" content=".*?" \/>/,
        `<meta name="twitter:description" content="${page.description}" />`
      )
      // inject prerender body
      .replace(
        '<div id="root"></div>',
        `<div id="root">${pagePrerenderBody}</div>`
      )

    fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf8")
    console.log(`✓ Generated ${page.path}/index.html with canonical ${pageUrl}`)
  }
}

run()
