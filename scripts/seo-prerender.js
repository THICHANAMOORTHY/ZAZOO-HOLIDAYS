import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, "../dist")
const SITE_URL = "https://zazoo1.vercel.app"

const pages = [
  // ── Core Navigation Pages ──
  {
    path: "packages",
    title: "Tour Packages | ZAZOO Holidays",
    description: "Explore curated group tour packages to Ooty, Kodaikanal, Munnar, Coorg, and more from Tamil Nadu. Flexible plans for schools, colleges, and families.",
    heading: "Discover Tour Packages",
    body: "Browse our sample itineraries designed for college industrial visits, school excursions, family holidays, and corporate getaways.",
  },
  {
    path: "upcoming",
    title: "Upcoming Trips | ZAZOO Holidays",
    description: "Join scheduled group departures and seasonal getaways to top South Indian hill stations with ZAZOO Holidays. Guided travel and transparent plans.",
    heading: "Upcoming Scheduled Trips",
    body: "Browse our fixed departure group journeys departing from Tamil Nadu to Ooty, Kodaikanal, Munnar, and Coorg.",
  },
  {
    path: "plan",
    title: "Custom Trip Planner | ZAZOO Holidays",
    description: "Plan a custom group tour with ZAZOO Holidays. Tailored travel dates, vetted stays, and private transport across Tamil Nadu, Kerala, and Karnataka.",
    heading: "Design Your Custom Group Itinerary",
    body: "Tell us your group size, travel dates, and dream destinations. We build complete door-to-door itineraries with vetted accommodation and private coach transit.",
  },
  {
    path: "about",
    title: "About Us | ZAZOO Holidays",
    description: "Discover ZAZOO Holidays — dedicated travel planners in Tamil Nadu creating safe, well-paced group journeys, college industrial visits, and family holidays.",
    heading: "About ZAZOO Holidays",
    body: "We organize thoughtful, well-paced group travel experiences across Tamil Nadu, Kerala, and Karnataka. From college IVs to family holidays, we handle the logistics so you can enjoy the journey.",
  },
  {
    path: "contact",
    title: "Contact Us | ZAZOO Holidays",
    description: "Connect with ZAZOO Holidays via phone or WhatsApp to plan your group tour. Serving colleges, families, and corporate teams across Tamil Nadu.",
    heading: "Contact ZAZOO Holidays",
    body: "Reach out directly via WhatsApp or phone (+91 73589 20436) to discuss your upcoming trip requirements with our planning team.",
  },
  {
    path: "book",
    title: "Booking Enquiry | ZAZOO Holidays",
    description: "Submit a booking enquiry for your upcoming group tour with ZAZOO Holidays. Get custom quotes and itinerary details for your preferred destination.",
    heading: "Send a Trip Booking Enquiry",
    body: "Submit your travel enquiry to receive personalized itinerary options, vehicle recommendations, and pricing details.",
  },

  // ── Legal & E-E-A-T Pages ──
  {
    path: "privacy",
    title: "Privacy Policy | ZAZOO Holidays",
    description: "Read the privacy policy of ZAZOO Holidays. Understand how we collect, use, and protect your travel enquiry details and personal contact information.",
    heading: "Privacy Policy",
    body: "Learn how ZAZOO Holidays protects your contact information, enquiry details, and trip preferences.",
  },
  {
    path: "terms",
    title: "Terms and Conditions | ZAZOO Holidays",
    description: "Review the terms and conditions for booking custom group tours, transport arrangements, and travel planning services with ZAZOO Holidays.",
    heading: "Terms and Conditions",
    body: "Review terms regarding custom itinerary quotes, booking confirmations, third-party vendor arrangements, and traveler safety.",
  },

  // ── Service SEO Landing Pages ──
  {
    path: "services/college-tours",
    title: "College Tours in Tamil Nadu | Industrial Visits & Group Trips",
    description: "College tours in Tamil Nadu by ZAZOO Holidays. Curriculum-aligned industrial visits, safe AC coach transit, vetted dorms, and dedicated road support.",
    heading: "College Tours & Industrial Visits in Tamil Nadu",
    body: "Expertly managed industrial visits and batch getaways across South India. Vetted stays, luxury pushback coaches, experienced mountain drivers, and complete student coordination.",
  },
  {
    path: "services/school-tours",
    title: "School Educational Tours in Tamil Nadu | Safe Student Travel",
    description: "School educational tours in Tamil Nadu by ZAZOO Holidays. High-safety student excursions, certified coaches, nutritious meals, and guided sightseeing.",
    heading: "School Educational Tours in Tamil Nadu",
    body: "Safe and enriching educational excursions for school students. Teacher-supervised itineraries, daylight-only driving, hygienic buffet meals, and interactive science and nature stops.",
  },
  {
    path: "services/family-trips",
    title: "Family Tour Packages from Tamil Nadu | Comfortable Group Holidays",
    description: "Family tour packages from Tamil Nadu with ZAZOO Holidays. Relaxed pacing, comfortable resort stays, and private vehicle transport for all ages.",
    heading: "Family Tour Packages from Tamil Nadu",
    body: "Private, relaxing family holidays spanning parents, grandparents, and children. Dedicated door-to-door cabs or tempo travelers, serene resort stays, and flexible sightseeing.",
  },
  {
    path: "services/corporate-tours",
    title: "Corporate Group Trips & Team Offsites | ZAZOO Holidays",
    description: "Corporate group trips and team offsites from Tamil Nadu with ZAZOO Holidays. Team-building activities, meeting facilities, and seamless transfers.",
    heading: "Corporate Group Trips & Team Offsites",
    body: "Turnkey corporate retreats, leadership meetings, and adventure offsites. Conference facilities, river rafting, outdoor team-building games, and GST-compliant invoicing.",
  },
  {
    path: "services/unofficial-trips",
    title: "Unofficial Group Trips & Friends Getaways | Adventure Travel",
    description: "Unofficial group trips and friends getaways with ZAZOO Holidays. Flexible road trips, scenic campfires, adventure stays, and budget-friendly plans.",
    heading: "Unofficial Group Trips & Friends Getaways",
    body: "Road trips and spontaneous adventures with your crew. Total schedule freedom, private plantation homestays, river rafting, trekking, and campfire nights.",
  },

  // ── Destination SEO Landing Pages ──
  {
    path: "destinations/ooty",
    title: "Ooty Tour Packages from Tamil Nadu | Nilgiris Hill Station Trips",
    description: "Ooty tour packages from Tamil Nadu with ZAZOO Holidays. Nilgiris tea estates, Botanical Gardens, Doddabetta Peak, and comfortable private transport.",
    heading: "Ooty Tour Packages from Tamil Nadu",
    body: "Experience South India's premier hill station at 2,240m. Sprawling tea estates, UNESCO heritage toy train rides, Pykara waterfalls, and pleasant mountain weather.",
  },
  {
    path: "destinations/kodaikanal",
    title: "Kodaikanal Tour Packages from Tamil Nadu | Princess of Hill Stations",
    description: "Kodaikanal tour packages from Tamil Nadu with ZAZOO Holidays. Kodai Lake, Coaker's Walk, Pine Forests, and tranquil resort stays in Palani Hills.",
    heading: "Kodaikanal Tour Packages from Tamil Nadu",
    body: "Quiet misty hills at 2,133m in the Palani range. Star-shaped Kodai Lake boating, Coaker's Walk cliff views, Pine Forest trails, and scenic waterfalls.",
  },
  {
    path: "destinations/munnar",
    title: "Munnar Tour Experiences from Tamil Nadu | Kerala Tea Hills",
    description: "Munnar tour packages from Tamil Nadu with ZAZOO Holidays. Sprawling tea estates, Eravikulam National Park, Mattupetty Dam, and Western Ghats mist.",
    heading: "Munnar Tour Experiences from Tamil Nadu",
    body: "Rolling green carpet tea plantations in the Western Ghats. Wildlife spotting at Eravikulam, speedboating on Mattupetty Dam, and refreshing high-range climates.",
  },
  {
    path: "destinations/coorg",
    title: "Coorg Travel Packages from Tamil Nadu | River Rafting & Coffee Hills",
    description: "Coorg tour packages from Tamil Nadu with ZAZOO Holidays. Barapole River rafting, coffee plantation homestays, Abbey Falls, and Raja's Seat in Karnataka.",
    heading: "Karnataka Coorg Travel Packages from Tamil Nadu",
    body: "Thrilling white-water rapids on the Barapole River, aromatic coffee estate walks, Abbey Falls, and Raja's Seat viewpoints. Perfect for adventure and group getaways.",
  },

  // ── Specific Package Detail Routes ──
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
  <main id="main-content">
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
          <a href="/services/college-tours">Explore College Tours &rarr;</a>
        </article>
        <article class="category-card">
          <small>02</small>
          <h3>School Tours</h3>
          <p>Safe, organized, and memorable educational trips designed for school students.</p>
          <a href="/services/school-tours">Explore School Tours &rarr;</a>
        </article>
        <article class="category-card">
          <small>03</small>
          <h3>Family Trips</h3>
          <p>Enjoy beautiful destinations, comfortable travel, and memorable family vacations.</p>
          <a href="/services/family-trips">Explore Family Trips &rarr;</a>
        </article>
        <article class="category-card">
          <small>04</small>
          <h3>Corporate Tours</h3>
          <p>Professional travel arrangements, employee outings, and team-building experiences.</p>
          <a href="/services/corporate-tours">Explore Corporate Tours &rarr;</a>
        </article>
        <article class="category-card">
          <small>05</small>
          <h3>Unofficial Trips</h3>
          <p>Adventure trips, weekend getaways, and unforgettable journeys with friends.</p>
          <a href="/services/unofficial-trips">Explore Unofficial Trips &rarr;</a>
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
          <a href="/destinations/ooty">View Ooty Tour Packages &rarr;</a>
        </article>
        <article class="dest-card">
          <div class="dest-card-header">
            <span>Tamil Nadu</span>
          </div>
          <h3>Kodaikanal</h3>
          <p>Kodaikanal is a quiet hill town in the Palani Hills at around 2,133 m. The star-shaped Kodai Lake, Coaker's Walk, Pine Forests, and Silver Cascade Falls are well-known spots. It suits groups looking for a relaxed pace with scenic walks and boat rides rather than a busy tourist circuit.</p>
          <a href="/destinations/kodaikanal">View Kodaikanal Tour Packages &rarr;</a>
        </article>
        <article class="dest-card">
          <div class="dest-card-header">
            <span>Kerala</span>
          </div>
          <h3>Munnar</h3>
          <p>Munnar in the Western Ghats is famous for its rolling tea estates, misty mornings, and biodiversity. Eravikulam National Park, Mattupetty Dam, and Top Station are popular stops. The cooler climate and scenic roads make it a refreshing option for family and college groups from Tamil Nadu.</p>
          <a href="/destinations/munnar">View Munnar Tour Experiences &rarr;</a>
        </article>
        <article class="dest-card">
          <div class="dest-card-header">
            <span>Karnataka</span>
          </div>
          <h3>Coorg (Madikeri)</h3>
          <p>Coorg in Karnataka is known for its coffee and spice plantations, the Barapole River, Abbey Falls, and Raja's Seat viewpoint. The region's hilly terrain supports activities like river rafting and plantation walks. It is a good fit for groups seeking a mix of nature and adventure.</p>
          <a href="/destinations/coorg">View Coorg Travel Packages &rarr;</a>
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
          <a href="/services/college-tours">Explore College Tours &rarr;</a>
        </div>
        <div class="type-card">
          <h3>School Tours</h3>
          <p>School educational trips demand thorough attention to safety, hygiene, nutrition, and age-appropriate pacing. We collaborate closely with school faculties to construct balanced itineraries with cultural and natural landmarks, safe coach transport, and dedicated ground support.</p>
          <a href="/services/school-tours">Explore School Tours &rarr;</a>
        </div>
        <div class="type-card">
          <h3>Family Trips</h3>
          <p>Family vacations span multiple generations with varying energy levels and preferences. We arrange private vehicles, comfortable family-friendly stays, and relaxed daily plans that blend sightseeing with plenty of rest so grandparents and children alike travel at ease.</p>
          <a href="/services/family-trips">Explore Family Trips &rarr;</a>
        </div>
        <div class="type-card">
          <h3>Corporate Tours</h3>
          <p>Corporate outings, leadership offsites, and team-building getaways are customized to your team size and objectives. We manage end-to-end conference halls, outdoor recreational activities, reliable transfers, and quality dining to ensure a productive and refreshing retreat.</p>
          <a href="/services/corporate-tours">Explore Corporate Tours &rarr;</a>
        </div>
        <div class="type-card">
          <h3>Unofficial Trips</h3>
          <p>Unofficial trips, friends' road journeys, and spontaneous weekend escapes are crafted with budget flexibility, trekking, campfires, and scenic viewpoints in mind. We suggest authentic homestays and offbeat trails, balancing exciting adventures with relaxed free time.</p>
          <a href="/services/unofficial-trips">Explore Unofficial Trips &rarr;</a>
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
    /<div id="root">[\s\S]*?<\/div>/,
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
      <main id="main-content" class="page-container">
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
        /<link rel="canonical" href=".*?" \/>/,
        `<link rel="canonical" href="${pageUrl}" />`
      )
      // og:url -> specific to this page!
      .replace(
        /<meta property="og:url" content=".*?" \/>/,
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
        /<div id="root">[\s\S]*?<\/div>/,
        `<div id="root">${pagePrerenderBody}</div>`
      )

    fs.writeFileSync(path.join(targetDir, "index.html"), pageHtml, "utf8")
    console.log(`✓ Generated ${page.path}/index.html with canonical ${pageUrl}`)
  }
}

run()
