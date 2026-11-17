import React from "react"
import { Link } from "react-router"
import {
  MapPin,
  Clock3,
  Users,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Calendar,
  MessageCircle,
  Bus,
  Building2,
  Mountain,
  GraduationCap,
  School,
  BriefcaseBusiness,
  Compass,
} from "lucide-react"
import { Button, Meta, PageHero, PackageCard, packages, whatsapp, PHONE, WA } from "./site"

// ─────────────────────────────────────────────────────────────
// SHARED REUSABLE COMPONENTS FOR LANDING PAGES
// ─────────────────────────────────────────────────────────────

interface LandingPageProps {
  metaTitle: string
  metaDesc: string
  canonicalPath: string
  eyebrow: string
  h1: string
  intro: string
  highlights: { title: string; desc: string; icon: React.ComponentType<{ className?: string }> }[]
  activities: string[]
  itinerary: { day: string; title: string; desc: string }[]
  travelInfo: { label: string; value: string }[]
  faqs: { q: string; a: string }[]
  targetPackages: string[]
  ctaHeadline: string
  ctaText: string
  whatsappMsg: string
  schemaType: "Service" | "TouristDestination"
}

function LandingTemplate({
  metaTitle,
  metaDesc,
  canonicalPath,
  eyebrow,
  h1,
  intro,
  highlights,
  activities,
  itinerary,
  travelInfo,
  faqs,
  targetPackages,
  ctaHeadline,
  ctaText,
  whatsappMsg,
  schemaType,
}: LandingPageProps) {
  const filteredPackages = packages.filter((p) => targetPackages.includes(p.slug))

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": schemaType,
        name: h1,
        description: metaDesc,
        url: `https://zazoo1.vercel.app/${canonicalPath}`,
        provider: {
          "@type": "TravelAgency",
          name: "ZAZOO Holidays",
          telephone: PHONE,
          url: "https://zazoo1.vercel.app/",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://zazoo1.vercel.app/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: h1,
            item: `https://zazoo1.vercel.app/${canonicalPath}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <Meta title={metaTitle} description={metaDesc} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero eyebrow={eyebrow} title={h1} text={intro} />

      {/* Quick Info Bar */}
      <section className="section" style={{ padding: "40px 26px 20px" }}>
        <div className="how-grid" style={{ gridTemplateColumns: `repeat(${travelInfo.length}, 1fr)` }}>
          {travelInfo.map((info) => (
            <div key={info.label} className="how-card" style={{ padding: "20px 22px" }}>
              <span className="how-step" style={{ fontSize: "11px", fontWeight: "800" }}>INFO</span>
              <h3 style={{ fontSize: "14px", marginTop: "12px", color: "#164f3c" }}>{info.label}</h3>
              <p style={{ fontSize: "13px", marginTop: "4px" }}>{info.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <div className="heading">
          <span>Key Experiences</span>
          <h2>Tour Highlights & Features</h2>
          <p>Thoughtfully planned around comfort, safety, and authentic travel experiences.</p>
        </div>
        <div className="dest-grid">
          {highlights.map(({ title, desc, icon: Icon }) => (
            <div key={title} className="dest-card">
              <div className="dest-card-header">
                <Icon />
                <span>Feature</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activities & Inclusions */}
      <section className="section tinted">
        <div className="heading">
          <span>What to expect</span>
          <h2>Activities & Group Experiences</h2>
          <p>Engaging outdoor and cultural activities tailored to group dynamics.</p>
        </div>
        <div className="types-grid">
          {activities.map((act) => (
            <div key={act} className="type-card" style={{ minHeight: "auto", padding: "20px 24px" }}>
              <span className="type-icon" style={{ width: "36px", height: "36px", margin: "0 0 12px" }}>
                <CheckCircle2 />
              </span>
              <h3 style={{ fontSize: "15px", margin: 0 }}>{act}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Itinerary */}
      {itinerary.length > 0 && (
        <section className="section">
          <div className="heading">
            <span>Verified Blueprint</span>
            <h2>Sample Route & Day-by-Day Flow</h2>
            <p>Every schedule is customized. Here is how a verified trip is typically structured.</p>
          </div>
          <div className="how-grid">
            {itinerary.map((item) => (
              <div key={item.day} className="how-card">
                <span className="how-step">{item.day}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Packages */}
      {filteredPackages.length > 0 && (
        <section className="section tinted">
          <div className="title-row">
            <div className="heading">
              <span>Curated options</span>
              <h2>Related Tour Packages</h2>
              <p>Explore sample packages that can be customized for your group dates and size.</p>
            </div>
            <Button to="/packages" kind="outline">
              All Packages <ArrowRight />
            </Button>
          </div>
          <div className="package-grid">
            {filteredPackages.map((p) => (
              <PackageCard item={p} key={p.slug} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="section">
        <div className="heading">
          <span>Frequently asked questions</span>
          <h2>Important Travel Information</h2>
          <p>Have questions before planning? Here are answers to common questions about this trip.</p>
        </div>
        <div className="faq-list">
          {faqs.map(({ q, a }) => (
            <div key={q} className="faq-item">
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div>
          <span>Direct Enquiry</span>
          <h2>{ctaHeadline}</h2>
          <p>{ctaText}</p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a
            href={whatsapp(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="button light"
          >
            <MessageCircle /> WhatsApp for Quote
          </a>
          <Button to="/book" kind="ghost">
            Enquire Online <ArrowRight />
          </Button>
        </div>
      </section>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// 1. SERVICE PAGES
// ─────────────────────────────────────────────────────────────

export function CollegeToursPage() {
  return (
    <LandingTemplate
      metaTitle="College Tours in Tamil Nadu"
      metaDesc="College tours in Tamil Nadu with ZAZOO Holidays. Industrial visits, educational travel, verified stays, and dedicated transport for college students."
      canonicalPath="services/college-tours"
      eyebrow="Specialized Student Travel"
      h1="College Tours & Industrial Visits in Tamil Nadu"
      intro="Carefully organized college trips, industrial visits, and graduation getaways departing from Tamil Nadu. We manage private coach transport, vetted dorms and hotels, and safety on the road."
      schemaType="Service"
      travelInfo={[
        { label: "Origin", value: "Any campus in Tamil Nadu" },
        { label: "Vehicle Types", value: "Pushback AC buses & tempo travelers" },
        { label: "Trip Duration", value: "2 to 5 days custom itineraries" },
        { label: "Faculty Support", value: "Dedicated driver & coordinator coordination" },
      ]}
      highlights={[
        {
          title: "Curriculum-Aligned Logistics",
          desc: "We align route planning and scheduled halts around your department's industrial visit requirements and college guidelines.",
          icon: GraduationCap,
        },
        {
          title: "Vetted Group Stays",
          desc: "Safe, spacious accommodation with separate faculty rooms, hygienic dining arrangements, and verified premises.",
          icon: Building2,
        },
        {
          title: "Dedicated Coach Transport",
          desc: "Reliable air-conditioned luxury pushback coaches with experienced long-distance drivers familiar with mountain routes.",
          icon: Bus,
        },
        {
          title: "Balanced Daily Itineraries",
          desc: "A mix of educational visits, scenic viewpoints, local exploration, and unstructured social time for classmates.",
          icon: Users,
        },
      ]}
      activities={[
        "Tea & spice processing factory visits in Nilgiris",
        "Scenic mountain route travel and group photo halts",
        "Campfire and social evenings with faculty approval",
        "Nature trekking and reservoir visits",
        "Local town sightseeing and handicraft markets",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Departure & Scenic Transit",
          desc: "Morning pickup from your college campus. Scenic mountain drive with scheduled breakfast and lunch stops. Evening check-in at accommodation.",
        },
        {
          day: "Day 2",
          title: "Industrial / Field Visit & Sightseeing",
          desc: "Morning scheduled industry or plantation visit. Afternoon visit to key natural viewpoints, gardens, and lakes. Group dinner.",
        },
        {
          day: "Day 3",
          title: "Local Exploration & Return Journey",
          desc: "Morning market exploration and group shopping. Check-out and comfortable return journey back to college campus.",
        },
      ]}
      targetPackages={["ooty-blue-mountains", "kodaikanal-adventure", "coorg-coffee-country"]}
      faqs={[
        {
          q: "Can you provide official quotes for college committee approval?",
          a: "Yes. We prepare detailed written itinerary proposals and cost breakdowns tailored for student committees and college management review.",
        },
        {
          q: "Are faculty members accommodated separately?",
          a: "Yes. We ensure faculty coordinators receive comfortable, private rooms with priority service throughout the stay.",
        },
        {
          q: "What safety protocols are followed for college tours?",
          a: "We deploy experienced commercial drivers, enforce night travel speed limits, ensure pre-checked accommodations, and maintain continuous on-road contact.",
        },
      ]}
      ctaHeadline="Plan Your College IV or Batch Trip"
      ctaText="Share your expected student headcount, dates, and destinations. We will tailor an itinerary that matches your budget and department requirements."
      whatsappMsg="Hello ZAZOO Holidays, we are planning a College Tour / Industrial Visit from Tamil Nadu. Please share customized package options."
    />
  )
}

export function SchoolToursPage() {
  return (
    <LandingTemplate
      metaTitle="School Educational Tours"
      metaDesc="School educational tours in Tamil Nadu by ZAZOO Holidays. High-safety student trips, certified coaches, nutritious meals, and guided sightseeing."
      canonicalPath="services/school-tours"
      eyebrow="Safe Educational Excursions"
      h1="School Educational Tours in Tamil Nadu"
      intro="Structured, safe, and engaging school excursions across Tamil Nadu and neighbouring hill regions. We work alongside school teachers to craft age-appropriate itineraries with maximum safety."
      schemaType="Service"
      travelInfo={[
        { label: "Target Groups", value: "Primary, middle & senior school batches" },
        { label: "Safety Level", value: "Zero night-driving, verified boarding" },
        { label: "Meal Plan", value: "Clean, wholesome student-friendly meals" },
        { label: "Coordination", value: "Teacher-assisted itinerary planning" },
      ]}
      highlights={[
        {
          title: "Rigorous Safety Standards",
          desc: "Pre-screened commercial coaches, disciplined drivers, speed governors, and daytime-only hill station driving.",
          icon: ShieldCheck,
        },
        {
          title: "Educational Landmark Stops",
          desc: "Botanical gardens, tea research institutes, biosphere reserves, and heritage museums that reinforce classroom learning.",
          icon: School,
        },
        {
          title: "Hygienic Dining & Lodging",
          desc: "Hot, freshly prepared meals with clean drinking water and secure, gated resort or hotel properties with separate teacher quarters.",
          icon: Building2,
        },
        {
          title: "Manageable Student Pacing",
          desc: "Shorter driving stints, regular restroom halts, and zero exhausting multi-hour treks to keep young travelers healthy and engaged.",
          icon: Clock3,
        },
      ]}
      activities={[
        "Guided botanical garden and floral conservation walks",
        "Interactive tea manufacturing demonstrations",
        "Boating and ecological wetland study",
        "Planetarium, wax museum, and heritage site visits",
        "Supervised picnic lunches in safe park lawns",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Morning Departure & Botanical Arrival",
          desc: "Early school campus departure by AC coach. Restroom and snack halts. Afternoon arrival at hotel, lunch, and visit to regional botanical gardens.",
        },
        {
          day: "Day 2",
          title: "Nature Trails & Science Exploration",
          desc: "Educational walk through tea plantations and processing units. Afternoon lake boating and nature reserve exploration. Group dinner and rest.",
        },
        {
          day: "Day 3",
          title: "Heritage Visit & Return",
          desc: "Morning educational museum tour. Souvenir and tea shopping under teacher supervision. Safe daytime coach return to school premises.",
        },
      ]}
      targetPackages={["ooty-blue-mountains", "kodaikanal-adventure", "yercaud-weekender"]}
      faqs={[
        {
          q: "How do you handle dietary preferences for school children?",
          a: "We work directly with hotel kitchens to arrange mild, freshly prepared vegetarian and non-vegetarian buffet options with mineral drinking water.",
        },
        {
          q: "Do you arrange medical assistance on the trip?",
          a: "All our vehicles carry well-stocked first aid kits, and our itinerary route maps identify local clinics and hospital facilities along every hill stretch.",
        },
      ]}
      ctaHeadline="Arrange a Safe School Excursion"
      ctaText="Connect with our tour coordinators to discuss class strengths, academic objectives, and teacher-to-student ratios for an exceptional outing."
      whatsappMsg="Hello ZAZOO Holidays, we want to organize a School Educational Tour from Tamil Nadu. Please provide your proposal."
    />
  )
}

export function FamilyTripsPage() {
  return (
    <LandingTemplate
      metaTitle="Family Tour Packages"
      metaDesc="Family tour packages from Tamil Nadu with ZAZOO Holidays. Relaxed pacing, comfortable resort stays, and private vehicle transport for all ages."
      canonicalPath="services/family-trips"
      eyebrow="Multigenerational Holidays"
      h1="Family Tour Packages from Tamil Nadu"
      intro="Private, relaxing holiday journeys crafted for parents, grandparents, and children. Enjoy scenic hill resorts, private cabs or tempo travelers, and stress-free schedules with ZAZOO Holidays."
      schemaType="Service"
      travelInfo={[
        { label: "Vehicle Scope", value: "Dedicated private sedan, SUV, or tempo" },
        { label: "Hotel Category", value: "Family suites & boutique tea estates" },
        { label: "Flexibility", value: "Adjustable halts and rest intervals" },
        { label: "Destinations", value: "Ooty, Kodaikanal, Munnar, Coorg" },
      ]}
      highlights={[
        {
          title: "Comfortable, Unrushed Days",
          desc: "Sightseeing schedules designed so seniors can enjoy the views without feeling rushed, with ample afternoon rest time.",
          icon: Clock3,
        },
        {
          title: "Private Door-to-Door Vehicle",
          desc: "Dedicated vehicle picked up from your home city in Tamil Nadu, staying with your family throughout the entire trip.",
          icon: Bus,
        },
        {
          title: "Family-Friendly Resorts",
          desc: "Carefully vetted properties with hot water, room heaters where needed, on-site dining, and serene surroundings.",
          icon: Building2,
        },
        {
          title: "Personalized Itinerary Freedom",
          desc: "Want to skip a crowded viewpoint and spend more time relaxing near the lake? Your driver and coordinator adapt to your pace.",
          icon: Sparkles,
        },
      ]}
      activities={[
        "Private boating on calm hill station lakes",
        "Gentle tea estate strolls and viewpoints",
        "Relaxing garden visits and rose displays",
        "Sightseeing historical landmarks and churches",
        "Shopping for homemade chocolates, eucalyptus oil, and spices",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Home Pickup & Scenic Ascent",
          desc: "Private vehicle pickup from your doorstep. Smooth drive up the ghats with pleasant tea stops. Check-in to your resort and enjoy a quiet evening.",
        },
        {
          day: "Day 2",
          title: "Sightseeing & Leisure",
          desc: "Visit top scenic spots in the morning. Return for lunch and family rest. Afternoon lake stroll and peaceful boat ride.",
        },
        {
          day: "Day 3",
          title: "Garden Walks & Relaxed Return",
          desc: "Breakfast overlooking the misty valley. Visit a tea garden for authentic tea tasting. Comfortable descent and drop back home.",
        },
      ]}
      targetPackages={["munnar-tea-trails", "ooty-blue-mountains", "kerala-backwaters"]}
      faqs={[
        {
          q: "Are the vehicles private just for our family?",
          a: "Yes. All our family tour packages include dedicated private vehicles exclusively for your group, with professional drivers.",
        },
        {
          q: "Can we request ground floor rooms for senior citizens?",
          a: "Absolutely. We specify room accessibility requirements directly with hotel properties during reservation.",
        },
      ]}
      ctaHeadline="Plan Your Next Family Getaway"
      ctaText="Let us take care of driving, route planning, and resort reservations so you can focus on quality moments with your family."
      whatsappMsg="Hello ZAZOO Holidays, we are planning a family holiday from Tamil Nadu. Please share customized package options."
    />
  )
}

export function CorporateToursPage() {
  return (
    <LandingTemplate
      metaTitle="Corporate Group Trips"
      metaDesc="Corporate group trips and team offsites from Tamil Nadu with ZAZOO Holidays. Team-building activities, meeting facilities, and seamless transfers."
      canonicalPath="services/corporate-tours"
      eyebrow="Team Offsites & Outings"
      h1="Corporate Tours & Team Offsites"
      intro="Recharge your company team with professional travel arrangements. From leadership retreats in Munnar to river rafting offsites in Coorg, we handle complete transfers, stays, and activities."
      schemaType="Service"
      travelInfo={[
        { label: "Company Sizes", value: "10 to 100+ employees" },
        { label: "Facilities", value: "Conference halls, projector setup, lawn dining" },
        { label: "Invoicing", value: "GST compliant billing available" },
        { label: "Logistics", value: "Airport/rail transfers & on-ground execution" },
      ]}
      highlights={[
        {
          title: "Turnkey Corporate Logistics",
          desc: "We coordinate executive buses, airport/station pickups, room allotments, and banquet meals with punctuality.",
          icon: BriefcaseBusiness,
        },
        {
          title: "Team-Building & Outdoor Fun",
          desc: "Rope courses, trekking, river rafting in Coorg, and evening campfire music sessions designed to strengthen team bonds.",
          icon: Users,
        },
        {
          title: "Meeting & Conference Readiness",
          desc: "Resorts equipped with conference rooms, AV support, and high-speed Wi-Fi for team presentations and brainstorming.",
          icon: Building2,
        },
        {
          title: "Transparent Group Quotes",
          desc: "No hidden charges. Clear per-head pricing covering transport, stay, meals, and scheduled activities.",
          icon: CheckCircle2,
        },
      ]}
      activities={[
        "White-water river rafting and team river crossings",
        "Structured team-building lawn games and problem solving",
        "Evening outdoor barbecue, campfire, and acoustic nights",
        "Coffee and tea plantation hiking tours",
        "Strategy meeting sessions in scenic hill conference rooms",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Arrival, Team Check-in & Icebreaker",
          desc: "Comfortable group transit from company base. Welcome drinks and check-in. Afternoon strategy meeting or icebreaker session followed by group dinner.",
        },
        {
          day: "Day 2",
          title: "Adventure & Team Bonding",
          desc: "Morning team rafting or trek. Outdoor lunch. Afternoon team-building games on resort lawns. Evening campfire celebration.",
        },
        {
          day: "Day 3",
          title: "Sightseeing & Return Transit",
          desc: "Leisure morning, optional sunrise viewpoint walk. Wrap-up lunch and smooth coach transfer back to office headquarters.",
        },
      ]}
      targetPackages={["coorg-coffee-country", "wayanad-wilderness", "goa-coastal-break"]}
      faqs={[
        {
          q: "Do you provide GST invoices for corporate accounting?",
          a: "Yes. All business travel packages can be invoiced with official GST documentation for corporate expenditure compliance.",
        },
        {
          q: "Can we mix work meetings with recreational activities?",
          a: "Yes. We specifically curate hybrid itineraries allowing 3-4 hours of presentation sessions balanced with outdoor group activities.",
        },
      ]}
      ctaHeadline="Book Your Company Team Offsite"
      ctaText="Tell us your team size, travel dates, and objective. We will provide a comprehensive corporate proposal within hours."
      whatsappMsg="Hello ZAZOO Holidays, we are organizing a Corporate Team Outing from Tamil Nadu. Please send us your corporate tour proposal."
    />
  )
}

export function UnofficialTripsPage() {
  return (
    <LandingTemplate
      metaTitle="Unofficial Group Trips"
      metaDesc="Unofficial group trips and friends getaways with ZAZOO Holidays. Flexible road trips, scenic campfires, adventure stays, and budget-friendly plans."
      canonicalPath="services/unofficial-trips"
      eyebrow="Spontaneous Adventures"
      h1="Unofficial Group Trips & Friends Getaways"
      intro="Weekend escapes and road journeys designed for groups of friends. Flexible itineraries, offbeat trails, campfire nights, and zero rigid checklists with ZAZOO Holidays."
      schemaType="Service"
      travelInfo={[
        { label: "Group Dynamic", value: "Friends, batchmates, trekking groups" },
        { label: "Pacing", value: "100% flexible, adventure-forward" },
        { label: "Stay Options", value: "Homestays, plantation cottages, tents" },
        { label: "Transport", value: "Tempo traveler or self-drive coordination" },
      ]}
      highlights={[
        {
          title: "Total Schedule Freedom",
          desc: "No rigid corporate rules. Sleep in, stop for roadside tea whenever you want, and linger at stunning viewpoints as long as you like.",
          icon: Compass,
        },
        {
          title: "Adventure Stays & Homestays",
          desc: "Private coffee estate homestays, mountaintop cottages, and riverside camps away from crowded tourist centers.",
          icon: Mountain,
        },
        {
          title: "Outdoor Thrills",
          desc: "Barapole white-water rafting, pine forest hiking, off-road jeep rides, and starry night campfires.",
          icon: Sparkles,
        },
        {
          title: "Budget-Friendly Per-Head Pricing",
          desc: "Smart group sharing options on vehicles and cottages so everyone gets great value without sacrificing safety.",
          icon: CheckCircle2,
        },
      ]}
      activities={[
        "Night campfire music and stargazing sessions",
        "White-water river rafting in Coorg",
        "Jeep safari trails through offbeat tea estates",
        "Trekking to untouched mountain viewpoints",
        "Local street food tasting and scenic highway stops",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Road Trip & Homestay Check-in",
          desc: "Early morning start with playlist running. Scenic road halts. Arrival at private estate homestay, evening sunset viewpoint hike, and campfire.",
        },
        {
          day: "Day 2",
          title: "Adventure Activity & Waterfalls",
          desc: "Full day of action: river rafting or forest trekking. Waterfalls visit and late afternoon cafe relaxation.",
        },
        {
          day: "Day 3",
          title: "Chill Morning & Journey Home",
          desc: "Sleep in, hot South Indian breakfast. Quick souvenir run, scenic downhill drive, and return home with unforgettable memories.",
        },
      ]}
      targetPackages={["kodaikanal-adventure", "coorg-coffee-country", "vagamon-cloud-escape"]}
      faqs={[
        {
          q: "How many friends are needed for a private trip?",
          a: "We cater to groups of any size! Typically groups range from 4 to 15+ friends, and we match vehicle sizing accordingly.",
        },
        {
          q: "Can we request private campfire and music arrangements?",
          a: "Yes. Many of our partner homestays in Coorg, Kodaikanal, and Munnar offer dedicated private campfire areas for friend groups.",
        },
      ]}
      ctaHeadline="Get Your Friends Trip Rolling"
      ctaText="Stop debating in the group chat — message us on WhatsApp with your rough dates and crew size, and we’ll send you an awesome plan."
      whatsappMsg="Hello ZAZOO Holidays, we want to plan an unofficial friends getaway! Please suggest destinations and routes."
    />
  )
}

// ─────────────────────────────────────────────────────────────
// 2. DESTINATION PAGES
// ─────────────────────────────────────────────────────────────

export function OotyPage() {
  return (
    <LandingTemplate
      metaTitle="Ooty Tour Packages"
      metaDesc="Ooty tour packages from Tamil Nadu with ZAZOO Holidays. Nilgiris tea estates, Botanical Gardens, Doddabetta Peak, and comfortable private transport."
      canonicalPath="destinations/ooty"
      eyebrow="Queen of Hill Stations · Tamil Nadu"
      h1="Ooty Tour Packages from Tamil Nadu"
      intro="Perched at 2,240 meters in the Nilgiris, Ooty is South India's quintessential hill station. From sprawling tea gardens and heritage toy trains to cool mist-laden mornings, our Ooty tour packages make group travel effortless."
      schemaType="TouristDestination"
      travelInfo={[
        { label: "Altitude", value: "2,240 meters (Nilgiris)" },
        { label: "Best Travel Window", value: "October to June" },
        { label: "Distance from Coimbatore", value: "~85 km (3 hours by road)" },
        { label: "Ideal Trip Length", value: "3 Days / 2 Nights" },
      ]}
      highlights={[
        {
          title: "Nilgiri Mountain Railway Experience",
          desc: "UNESCO heritage toy train ride chugging through scenic pine valleys, bridges, and tunnels between Coonoor and Ooty.",
          icon: Bus,
        },
        {
          title: "Botanical & Rose Gardens",
          desc: "Over 50 acres of exotic flora, fossil tree trunks, and thousands of hybrid rose species overlooking town hillsides.",
          icon: Sparkles,
        },
        {
          title: "Doddabetta & Pykara Lakes",
          desc: "Panoramic 360-degree Nilgiri summit vistas at Doddabetta Peak followed by tranquil boat rides at Pykara Lake and waterfalls.",
          icon: Mountain,
        },
        {
          title: "Tea Factory & Chocolate Tasting",
          desc: "Guided walk through operating tea processing units with fresh Nilgiri tea tasting and homemade chocolate shopping.",
          icon: Building2,
        },
      ]}
      activities={[
        "Boating across Ooty Lake and Pykara Reservoir",
        "Exploring sprawling tea plantations in Coonoor and Kotagiri",
        "Walking through pine forest trails and shooting spots",
        "Visiting Doddabetta Peak telescope house",
        "Shopping for natural essential oils, Nilgiri spices, and chocolates",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Scenic Hill Climb & Ooty Lake",
          desc: "Pickup from Coimbatore or your home city in Tamil Nadu. Scenic ghat ascent. Hotel check-in, visit to Government Botanical Garden, and sunset boating at Ooty Lake.",
        },
        {
          day: "Day 2",
          title: "Doddabetta, Tea Estates & Coonoor",
          desc: "Morning climb to Doddabetta Peak. Guided tea factory tour. Afternoon visit to Sim’s Park and Dolphin’s Nose viewpoint in nearby Coonoor.",
        },
        {
          day: "Day 3",
          title: "Pine Forests, Pykara & Descent",
          desc: "Morning visit to peaceful Pykara Waterfalls and Pine Valley trails. Afternoon descent and drop-off at your departure point.",
        },
      ]}
      targetPackages={["ooty-blue-mountains", "yercaud-weekender"]}
      faqs={[
        {
          q: "What is the best route to reach Ooty from Tamil Nadu?",
          a: "Most trips travel via Coimbatore or Mettupalayam up the picturesque Nilgiri ghat road. Private coaches or cabs provide the most comfortable connection.",
        },
        {
          q: "Are warm clothes necessary in Ooty?",
          a: "Yes. Temperatures often drop below 12°C during evenings and winter months, so jackets and shawls are strongly recommended.",
        },
      ]}
      ctaHeadline="Experience Ooty with ZAZOO Holidays"
      ctaText="Whether it’s a college industrial visit or a relaxing family weekend, we coordinate vehicles, permits, and stays for your Ooty tour."
      whatsappMsg="Hello ZAZOO Holidays, I would like to book an Ooty Tour Package. Please send details."
    />
  )
}

export function KodaikanalPage() {
  return (
    <LandingTemplate
      metaTitle="Kodaikanal Tour Packages"
      metaDesc="Kodaikanal tour packages from Tamil Nadu with ZAZOO Holidays. Kodai Lake, Coaker's Walk, Pine Forests, and tranquil resort stays in Palani Hills."
      canonicalPath="destinations/kodaikanal"
      eyebrow="Princess of Hill Stations · Tamil Nadu"
      h1="Kodaikanal Tour Packages from Tamil Nadu"
      intro="Nestled at 2,133 meters in the Palani Hills, Kodaikanal offers a quieter, mistier hill retreat. Stroll around the iconic star-shaped lake, walk through towering pine forests, and take in cliffside valley views."
      schemaType="TouristDestination"
      travelInfo={[
        { label: "Altitude", value: "2,133 meters (Palani Hills)" },
        { label: "Best Travel Window", value: "September to May" },
        { label: "Distance from Madurai", value: "~120 km (3.5 hours by road)" },
        { label: "Ideal Trip Length", value: "2 to 3 Days" },
      ]}
      highlights={[
        {
          title: "Star-Shaped Kodai Lake",
          desc: "Centuries-old manmade lake surrounded by weeping willows, cycling paths, and paddle-boating waters in the heart of town.",
          icon: Sparkles,
        },
        {
          title: "Pine Forest Trails & Guna Caves",
          desc: "Atmospheric woodlands planted in the early 1900s, offering walking trails and photography backdrops.",
          icon: Mountain,
        },
        {
          title: "Coaker’s Walk & Pillar Rocks",
          desc: "Cliff-edge walking promenade overlooking vast valley plains, with dramatic three-vertical-granite boulder viewpoints at Pillar Rocks.",
          icon: Compass,
        },
        {
          title: "Silver Cascade & Bear Shola Falls",
          desc: "Gushing natural waterfalls surrounded by thick Western Ghats reserve greenery.",
          icon: MapPin,
        },
      ]}
      activities={[
        "Cycling and pedal-boating around Kodaikanal Lake",
        "Scenic walking along Coaker's Walk promenade",
        "Exploring Pine Forest and Moir Point viewpoints",
        "Visiting Bryant Park floral displays",
        "Shopping for Tibetan handicrafts, organic honey, and spices",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Arrival via Silver Cascade & Lake Evening",
          desc: "Pickup from Madurai or Dindigul. Hill ascent with a stop at Silver Cascade Falls. Hotel check-in, evening boat ride on Kodai Lake, and lakeside shopping.",
        },
        {
          day: "Day 2",
          title: "Pillar Rocks, Pine Forest & Viewpoints",
          desc: "Full day sightseeing: Coaker’s Walk, Green Valley View, Pillar Rocks, and atmospheric Pine Forest. Evening campfire at the stay.",
        },
        {
          day: "Day 3",
          title: "Bryant Park & Return Descent",
          desc: "Morning stroll through Bryant Park. Check-out and comfortable return transfer with scenic valley photo stops.",
        },
      ]}
      targetPackages={["kodaikanal-adventure", "ooty-blue-mountains"]}
      faqs={[
        {
          q: "Is Kodaikanal suitable for college and friend groups?",
          a: "Kodaikanal is one of South India's top choices for friend getaways and college tours due to its compact sightseeing radius and pleasant walking weather.",
        },
        {
          q: "What is the closest railway station to Kodaikanal?",
          a: "Kodai Road (KQN) and Dindigul Junction are the closest railway stations, where we arrange direct coach or cab pickups.",
        },
      ]}
      ctaHeadline="Plan Your Kodaikanal Adventure"
      ctaText="Get a complete Kodaikanal itinerary tailored to your group size, departure city in Tamil Nadu, and preferred accommodation type."
      whatsappMsg="Hello ZAZOO Holidays, I would like to book a Kodaikanal Tour Package. Please send itinerary and prices."
    />
  )
}

export function MunnarPage() {
  return (
    <LandingTemplate
      metaTitle="Munnar Tour Experiences"
      metaDesc="Munnar tour packages from Tamil Nadu with ZAZOO Holidays. Sprawling tea estates, Eravikulam National Park, Mattupetty Dam, and Western Ghats mist."
      canonicalPath="destinations/munnar"
      eyebrow="Western Ghats Tea Paradise · Kerala"
      h1="Munnar Tour Experiences from Tamil Nadu"
      intro="Sprawling green tea estates rolling as far as the eye can see, cool misty mornings, and rich biodiversity. Located in Kerala's high ranges, Munnar is an unforgettable destination for Tamil Nadu travelers."
      schemaType="TouristDestination"
      travelInfo={[
        { label: "Altitude", value: "1,600 meters (High Ranges)" },
        { label: "Best Travel Window", value: "September to April" },
        { label: "Transit from Coimbatore / Madurai", value: "4 to 5 hours scenic drive" },
        { label: "Ideal Trip Length", value: "3 Days / 2 Nights" },
      ]}
      highlights={[
        {
          title: "Endless Tea Garden Valleys",
          desc: "Lush, manicured carpet-like tea plantations stretching across rolling hills, punctuated by silver waterfalls.",
          icon: Sparkles,
        },
        {
          title: "Eravikulam National Park",
          desc: "Home to the endangered Nilgiri Tahr mountain goat and the highest peak in South India, Anamudi (2,695m).",
          icon: Mountain,
        },
        {
          title: "Mattupetty Dam & Echo Point",
          desc: "Water reservoir nestled between hills offering speedboating, natural echo acoustics, and elephant sighting zones.",
          icon: Compass,
        },
        {
          title: "Top Station Cloud Views",
          desc: "The highest vantage point on the Munnar-Kodaikanal border offering panoramic views into Tamil Nadu's valleys below.",
          icon: MapPin,
        },
      ]}
      activities={[
        "Visiting tea processing museums and sampling black & green teas",
        "Speedboating on Mattupetty Dam lake",
        "Wildlife spotting at Eravikulam National Park",
        "Photographing tea estate waterfalls like Attukal and Cheeyappara",
        "Exploring Munnar town spice markets and chocolate outlets",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Ghat Drive, Waterfalls & Check-in",
          desc: "Early departure from Tamil Nadu. Scenic climb with photo stops at Cheeyappara Waterfalls. Check-in to high-range tea resort and enjoy mist-covered evening views.",
        },
        {
          day: "Day 2",
          title: "Eravikulam, Tea Gardens & Mattupetty",
          desc: "Morning wildlife tour of Eravikulam National Park. Afternoon visit to Mattupetty Dam, Echo Point, and Kundala Lake. Traditional Kerala cuisine dinner.",
        },
        {
          day: "Day 3",
          title: "Tea Museum & Return Journey",
          desc: "Morning visit to the Tata Tea Museum. Fresh tea and spice shopping in town. Comfortable drive back down the ghats to your destination.",
        },
      ]}
      targetPackages={["munnar-tea-trails", "kerala-backwaters", "wayanad-wilderness"]}
      faqs={[
        {
          q: "How do travelers from Tamil Nadu travel to Munnar?",
          a: "The most scenic routes pass through Theni-Bodinayakanur or Udumalpet-Chinnar. We provide private AC vehicles from any city in Tamil Nadu.",
        },
        {
          q: "Is advance booking required for Eravikulam National Park?",
          a: "Yes, during peak seasons forest entry slots fill quickly. We assist groups with coordinated entry timings.",
        },
      ]}
      ctaHeadline="Book Your Munnar Tea Trail Experience"
      ctaText="Experience the cool beauty of Kerala’s hill country. We coordinate transportation, stay, and sightseeing from your hometown."
      whatsappMsg="Hello ZAZOO Holidays, please share itinerary and quote for a Munnar Tour Package."
    />
  )
}

export function CoorgPage() {
  return (
    <LandingTemplate
      metaTitle="Coorg Travel Packages"
      metaDesc="Coorg tour packages from Tamil Nadu with ZAZOO Holidays. Barapole River rafting, coffee plantation homestays, Abbey Falls, and Raja's Seat in Karnataka."
      canonicalPath="destinations/coorg"
      eyebrow="Coffee & Adventure Country · Karnataka"
      h1="Karnataka Coorg Travel Packages from Tamil Nadu"
      intro="Known as the Scotland of India, Coorg (Kodagu) blends misty hills, fragrant coffee plantations, thrilling Barapole river rafting, and distinct cultural heritage into an incredible group holiday."
      schemaType="TouristDestination"
      travelInfo={[
        { label: "Altitude", value: "1,100 to 1,750 meters" },
        { label: "Best Travel Window", value: "July to March" },
        { label: "Rafting Season", value: "Monsoon & Post-Monsoon (Jul-Dec)" },
        { label: "Ideal Trip Length", value: "3 Days / 2 Nights" },
      ]}
      highlights={[
        {
          title: "Barapole River White-Water Rafting",
          desc: "Exciting Grade II to Grade IV river rapids handled by certified river guides through lush Western Ghats forest gorges.",
          icon: Sparkles,
        },
        {
          title: "Authentic Coffee Estate Stays",
          desc: "Relaxing homestays and private resorts surrounded by arabica coffee bushes, cardamom plants, and tall pepper vines.",
          icon: Building2,
        },
        {
          title: "Abbey & Iruppu Falls",
          desc: "Spectacular waterfalls cascading over granite boulders amidst dense coffee and spice greenery.",
          icon: Mountain,
        },
        {
          title: "Raja’s Seat & Dubare Elephant Camp",
          desc: "Historical garden where kings watched sunsets, alongside river crossings to observe elephant bathing and feeding.",
          icon: MapPin,
        },
      ]}
      activities={[
        "White-water river rafting along the Barapole River",
        "Coffee plantation guided walking and tasting tours",
        "Visiting Abbey Falls and the hanging bridge",
        "Watching sunset at Raja’s Seat viewpoint",
        "Exploring Namdroling Golden Temple at Bylakuppe",
      ]}
      itinerary={[
        {
          day: "Day 1",
          title: "Transit & Plantation Check-in",
          desc: "Early departure from Tamil Nadu. Smooth highway drive into Karnataka. Arrival at coffee estate resort, afternoon plantation stroll, and evening campfire.",
        },
        {
          day: "Day 2",
          title: "Barapole Rafting & Abbey Falls",
          desc: "Thrilling morning white-water rafting session on the Barapole River. Post-lunch visit to Abbey Falls and sunset at Raja's Seat in Madikeri.",
        },
        {
          day: "Day 3",
          title: "Golden Temple & Return",
          desc: "Visit the serene Tibetan Golden Temple at Bylakuppe. Shopping for pure Coorg coffee, homemade wines, and spices before returning home.",
        },
      ]}
      targetPackages={["coorg-coffee-country", "wayanad-wilderness"]}
      faqs={[
        {
          q: "Is white-water rafting safe for beginners?",
          a: "Yes. All Barapole rafting sessions are conducted by licensed river instructors equipped with international standard life jackets and helmets.",
        },
        {
          q: "How far is Coorg from Tamil Nadu?",
          a: "From Coimbatore or Salem, Coorg is roughly 6 to 7 hours by road. Private coach or tempo traveler transfers ensure a smooth and pleasant journey.",
        },
      ]}
      ctaHeadline="Book Your Coorg Rafting & Coffee Trip"
      ctaText="Gather your college batch, friends, or family for an unforgettable Karnataka adventure. Custom quotes provided within hours."
      whatsappMsg="Hello ZAZOO Holidays, I would like to book a Coorg Travel Package. Please send details."
    />
  )
}

// ─────────────────────────────────────────────────────────────
// 3. LEGAL & TRUST PAGES (PRIVACY & TERMS)
// ─────────────────────────────────────────────────────────────

export function PrivacyPage() {
  return (
    <>
      <Meta
        title="Privacy Policy"
        description="Privacy policy of ZAZOO Holidays. Learn how we handle your travel enquiry details and protect personal contact information."
      />
      <PageHero
        eyebrow="Legal & Trust"
        title="Privacy Policy"
        text="Your privacy matters to us. Here is how we collect, handle, and safeguard your personal details when you contact ZAZOO Holidays."
      />
      <section className="section legal-content">
        <article className="prose">
          <small>Effective Date: January 15, 2026 · Last Updated: November 17, 2026</small>

          <h2>1. Information We Collect</h2>
          <p>
            When you interact with ZAZOO Holidays through our website forms, phone calls, or WhatsApp, we may collect the following details:
          </p>
          <ul>
            <li>Your name and contact phone number / WhatsApp number.</li>
            <li>Travel preferences including preferred destinations, group size, estimated travel dates, and category of trip (college, school, family, corporate, or friends).</li>
            <li>Specific requests, accommodation preferences, or accessibility needs shared during planning discussions.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use your contact and trip details solely to:
          </p>
          <ul>
            <li>Prepare custom itineraries and accurate pricing estimates tailored to your group.</li>
            <li>Communicate with you regarding your enquiry, updates, and on-trip coordination.</li>
            <li>Coordinate transport and lodging bookings with verified ground partners where agreed upon.</li>
          </ul>

          <h2>3. Data Protection and Sharing</h2>
          <p>
            ZAZOO Holidays does not sell, rent, or trade your personal data to third parties for marketing purposes. Relevant details (such as traveler names and counts) are only shared with hotel properties, vehicle operators, and activity guides strictly to confirm reservations on your behalf.
          </p>

          <h2>4. Data Retention and Security</h2>
          <p>
            We retain your contact details only for the duration required to complete your enquiry or travel coordination. Standard administrative safeguards are applied to protect your information from unauthorized access.
          </p>

          <h2>5. Your Rights and Contact Information</h2>
          <p>
            You may request to review, update, or delete your contact details from our records at any time. For privacy inquiries, please contact us at:
          </p>
          <p>
            <strong>ZAZOO Holidays</strong><br />
            Phone / WhatsApp: +91 73589 20436<br />
            Operating from Tamil Nadu, India.
          </p>
        </article>
      </section>
    </>
  )
}

export function TermsPage() {
  return (
    <>
      <Meta
        title="Terms and Conditions"
        description="Terms and conditions for ZAZOO Holidays. Review terms covering group tour planning, itineraries, bookings, and travel coordination."
      />
      <PageHero
        eyebrow="Legal & Agreements"
        title="Terms and Conditions"
        text="Please read these terms carefully before confirming your group tour itinerary and arrangements with ZAZOO Holidays."
      />
      <section className="section legal-content">
        <article className="prose">
          <small>Effective Date: January 15, 2026 · Last Updated: November 17, 2026</small>

          <h2>1. Services Scope</h2>
          <p>
            ZAZOO Holidays operates as a dedicated travel planning and coordination service based in Tamil Nadu. We curate tailored itineraries, coordinate road transport, and arrange lodging for college industrial visits, school tours, corporate retreats, family holidays, and private group getaways.
          </p>

          <h2>2. Itineraries and Quotations</h2>
          <p>
            The packages listed on this website serve as sample itineraries to illustrate possible routes, attractions, and durations. Final trip plans and quotes depend on actual travel dates, party size, vehicle selection, and hotel category. Quotations are provided upon direct discussion via WhatsApp or phone and are valid for the timeframe specified in your quote.
          </p>

          <h2>3. Booking Confirmation and Payments</h2>
          <p>
            A trip booking is considered confirmed only upon receipt of the agreed advance payment and mutual agreement on the finalized itinerary. Detailed payment milestones will be clearly outlined before confirmation.
          </p>

          <h2>4. Cancellations and Modifications</h2>
          <p>
            If you need to reschedule or cancel your journey, please notify us immediately. Cancellation fees and refund eligibility depend directly on the policies of third-party vendors (such as coach operators, hotels, and activity providers). We will make every effort to minimize penalty charges and reschedule where possible.
          </p>

          <h2>5. Traveler Safety and Responsibilities</h2>
          <p>
            Travelers must carry valid government-issued photo identification. College and school tour groups must be accompanied by appropriate faculty or designated adult guardians. While ZAZOO Holidays takes great care in selecting dependable partners, travelers are responsible for their personal belongings and adhering to local site guidelines, safety rules, and forest/wildlife regulations.
          </p>

          <h2>6. Force Majeure</h2>
          <p>
            ZAZOO Holidays is not liable for itinerary changes, delays, or cancellations caused by circumstances beyond reasonable control, including extreme weather events, landslides, roadblocks, strikes, or governmental travel restrictions. In such events, alternative routes or rescheduling options will be provided where feasible.
          </p>

          <h2>7. Contact</h2>
          <p>
            For any clarifications regarding these terms, please contact:
            <br />
            <strong>ZAZOO Holidays</strong>
            <br />
            Phone / WhatsApp: +91 73589 20436
            <br />
            Operating from Tamil Nadu, India.
          </p>
        </article>
      </section>
    </>
  )
}
