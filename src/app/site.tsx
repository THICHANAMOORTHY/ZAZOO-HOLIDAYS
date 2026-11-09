import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react"
import {
  ArrowRight,
  BadgeCheck,
  BedDouble,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Compass,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  Plus,
  Route,
  School,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TrainFront,
  Users,
  Utensils,
  X,
} from "lucide-react"
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router"

const PHONE = "+91 73589 20436"
const WA = "https://wa.me/917358920436"
const image = (id: string) =>
  id.startsWith("/") || id.startsWith("http")
    ? id
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=82`
const whatsapp = (text: string) => `${WA}?text=${encodeURIComponent(text)}`

type TripPackage = {
  slug: string
  title: string
  destination: string
  duration: string
  price: number
  category: string
  image: string
  description: string
}
export const packages: TripPackage[] = [
  [
    "ooty-blue-mountains",
    "Ooty Blue Mountains",
    "Ooty",
    "3 Days / 2 Nights",
    3999,
    "Family Trips",
    "/ooty.jpg",
    "Tea gardens, misty viewpoints and a relaxed Nilgiris escape.",
  ],
  [
    "kodaikanal-adventure",
    "Kodaikanal Adventure",
    "Kodaikanal",
    "2 Days / 1 Night",
    2499,
    "Unofficial Trips",
    "/kodaikanal.jpg",
    "Forest trails, lakeside moments and cool mountain air.",
  ],
  [
    "munnar-tea-trails",
    "Munnar Tea Trails",
    "Munnar",
    "3 Days / 2 Nights",
    4499,
    "Family Trips",
    "/munnar.jpg",
    "Rolling tea estates, waterfalls and Kerala's high ranges.",
  ],
  [
    "vagamon-cloud-escape",
    "Vagamon Cloud Escape",
    "Vagamon",
    "2 Days / 1 Night",
    2999,
    "College IV",
    "photo-1500530855697-b586d89ba3ee",
    "Pine forests, green meadows and unforgettable group time.",
  ],
  [
    "wayanad-wilderness",
    "Wayanad Wilderness",
    "Wayanad",
    "3 Days / 2 Nights",
    4999,
    "Corporate Tours",
    "photo-1511497584788-876760111969",
    "A refreshing mix of nature, culture and team experiences.",
  ],
  [
    "kerala-backwaters",
    "Kerala Backwaters",
    "Kerala",
    "4 Days / 3 Nights",
    6999,
    "Family Trips",
    "photo-1602216056096-3b40cc0c9944",
    "A soulful journey through calm waters and coconut groves.",
  ],
  [
    "goa-coastal-break",
    "Goa Coastal Break",
    "Goa",
    "4 Days / 3 Nights",
    7499,
    "Unofficial Trips",
    "photo-1512343879784-a960bf40e7f2",
    "Golden coasts, heritage streets and vibrant group memories.",
  ],
  [
    "coorg-coffee-country",
    "Karnataka Coorg Adventure",
    "Coorg, Karnataka",
    "3 Days / 2 Nights",
    4799,
    "College IV & Adventure",
    "/coorg.webp",
    "Barapole river rafting, lush coffee plantation walks, Abbey Falls, and thrilling outdoor memories with your group.",
  ],
  [
    "yercaud-weekender",
    "Yercaud Weekender",
    "Yercaud",
    "2 Days / 1 Night",
    2299,
    "School Tours",
    "photo-1500534623283-312aade485b7",
    "An easy hill escape with scenic loops and lake views.",
  ],
  [
    "valparai-wild-roads",
    "Valparai Wild Roads",
    "Valparai",
    "2 Days / 1 Night",
    2799,
    "College IV",
    "photo-1464822759023-fed622ff2c3b",
    "Dramatic bends, tea estates and raw Western Ghats beauty.",
  ],
].map(
  ([slug, title, destination, duration, price, category, pic, description]) =>
    ({
      slug,
      title,
      destination,
      duration,
      price,
      category,
      image: image(pic as string),
      description,
    }) as TripPackage,
)

const categories = [
  [
    "College IV",
    GraduationCap,
    "Educational tours, industrial visits, and unforgettable college group experiences organized with care.",
  ],
  [
    "School Tours",
    School,
    "Safe, organized, and memorable educational trips designed for school students.",
  ],
  [
    "Family Trips",
    Users,
    "Enjoy beautiful destinations, comfortable travel, and memorable family vacations.",
  ],
  [
    "Corporate Tours",
    BriefcaseBusiness,
    "Professional travel arrangements, employee outings, and team-building experiences.",
  ],
  [
    "Unofficial Trips",
    Mountain,
    "Adventure trips, weekend getaways, and unforgettable journeys with friends.",
  ],
] as const

function Meta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | ZAZOO Holidays`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description)
    window.scrollTo(0, 0)
  }, [title, description])
  return null
}
function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? "light" : ""}`} to="/">
      <span>
        <Compass />
      </span>
      <b>
        ZAZOO<small>HOLIDAYS</small>
      </b>
    </Link>
  )
}
function Button({
  to,
  children,
  kind = "primary",
}: {
  to?: string
  children: ReactNode
  kind?: "primary" | "outline" | "light" | "ghost"
}) {
  const c = `button ${kind}`
  return to ? (
    <Link className={c} to={to}>
      {children}
    </Link>
  ) : (
    <button className={c}>{children}</button>
  )
}
function Navbar() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc])
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Brand />
        <nav className={open ? "open" : ""}>
          {[
            ["/", "Home"],
            ["/packages", "Tour Packages"],
            ["/upcoming", "Upcoming Trips"],
            ["/about", "About Us"],
            ["/contact", "Contact Us"],
          ].map(([to, label]) => (
            <NavLink end={to === "/"} key={to} to={to}>
              {label}
            </NavLink>
          ))}
          <a className="wa-link" href={WA} target="_blank">
            <MessageCircle />
          </a>
          <Button to="/book">
            Book your trip <ArrowRight />
          </Button>
        </nav>
        <button className="menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Brand light />
          <p>
            Thoughtful journeys for colleges, schools, families, teams and
            friends across Tamil Nadu and beyond.
          </p>
          <a href="https://instagram.com/zazoo_holidays_official">
            <Camera /> @zazoo_holidays_official
          </a>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/packages">Tour packages</Link>
          <Link to="/upcoming">Upcoming trips</Link>
          <Link to="/plan">Custom planner</Link>
        </div>
        <div>
          <h3>Company</h3>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/book">Booking enquiry</Link>
        </div>
        <div>
          <h3>Let’s talk</h3>
          <a href={`tel:${PHONE.replaceAll(" ", "")}`}>
            <Phone /> {PHONE}
          </a>
          <a href={WA}>
            <MessageCircle /> WhatsApp us
          </a>
          <p>Serving all over Tamil Nadu</p>
        </div>
      </div>
      <div className="copyright">
        <span>© 2026 ZAZOO Holidays</span>
        <span>Travel far. Remember forever.</span>
      </div>
    </footer>
  )
}
export function Root() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <a className="floating-wa" href={WA} target="_blank">
        <MessageCircle />
      </a>
    </>
  )
}
function Heading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text?: string
}) {
  return (
    <div className="heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}
function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <section className="page-hero">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}

function SearchPanel() {
  const nav = useNavigate()
  const [error, setError] = useState("")
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const dest = String(d.get("destination") || ""),
      cat = String(d.get("category") || "")
    if (!dest && !cat)
      return setError("Choose a destination or category to begin.")
    nav(`/packages?destination=${dest}&category=${cat}`)
  }
  return (
    <form className="search-panel" onSubmit={submit}>
      <label>
        <span>Destination</span>
        <select name="destination">
          <option value="">Where to?</option>
          {packages.map((p) => (
            <option key={p.slug}>{p.destination}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Trip category</span>
        <select name="category">
          <option value="">Choose a style</option>
          {categories.map((c) => (
            <option key={c[0]}>{c[0]}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Travel date</span>
        <input type="date" />
      </label>
      <label>
        <span>Travelers</span>
        <input type="number" min="1" placeholder="How many?" />
      </label>
      <button>
        <Search /> Search trips
      </button>
      {error && <small>{error}</small>}
    </form>
  )
}
export function Home() {
  return (
    <>
      <Meta
        title="Memorable Group Tours from Tamil Nadu"
        description="Explore thoughtfully planned group journeys with ZAZOO Holidays."
      />
      <section className="hero">
        <div className="hero-shade" />
        <div className="hero-copy">
          <span>
            <Sparkles /> Journeys made personal
          </span>
          <h1>
            Your Journey.
            <br />
            <em>Our Adventure.</em>
          </h1>
          <p>
            Discover unforgettable journeys with ZAZOO Holidays. From college
            trips to family vacations, we make every journey memorable.
          </p>
          <div>
            <Button to="/packages" kind="light">
              Explore packages <ArrowRight />
            </Button>
            <Button to="/plan" kind="ghost">
              Plan your trip
            </Button>
          </div>
        </div>
      </section>
      <div className="search-wrap">
        <SearchPanel />
      </div>
      <section className="section">
        <Heading
          eyebrow="Find your kind of trip"
          title="Explore Our Travel Experiences"
          text="Every journey has a story. Choose your next adventure with ZAZOO Holidays."
        />
        <div className="category-grid">
          {categories.map(([title, Icon, text], i) => (
            <Link
              className="category-card"
              to={`/packages?category=${title}`}
              key={title}
            >
              <small>0{i + 1}</small>
              <span>
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <b>
                Explore {title} <ArrowRight />
              </b>
            </Link>
          ))}
        </div>
      </section>
      <section className="section tinted">
        <div className="title-row">
          <Heading
            eyebrow="Curated escapes"
            title="Trips worth talking about"
            text="Sample itineraries to inspire your next group journey."
          />
          <Button to="/packages" kind="outline">
            View all packages
          </Button>
        </div>
        <div className="coorg-spotlight">
          <div className="coorg-spotlight-img">
            <img src="/coorg.webp" alt="Karnataka Coorg River Rafting" />
            <span className="coorg-tag">
              <Sparkles /> Featured Adventure · Karnataka
            </span>
          </div>
          <div className="coorg-spotlight-body">
            <span className="coorg-eyebrow">Spotlight Journey</span>
            <h2>Karnataka Coorg — River Rafting & Hills</h2>
            <p>
              Tackle thrilling white-water rapids along the Barapole River, hike through fragrant coffee and spice estates, discover hidden waterfalls, and unwind around evening campfires. Crafted with full transport and safety coordination.
            </p>
            <div className="coorg-highlights">
              <div>
                <Route />
                <b>Barapole River Rafting</b>
                <small>Grade II–IV rapids with expert guides</small>
              </div>
              <div>
                <Mountain />
                <b>Plantations & Abbey Falls</b>
                <small>Coffee trails & scenic Western Ghats</small>
              </div>
              <div>
                <Clock3 />
                <b>3 Days / 2 Nights</b>
                <small>WhatsApp for price details</small>
              </div>
            </div>
            <div className="coorg-actions">
              <Button to="/packages/coorg-coffee-country">
                View Coorg Details <ArrowRight />
              </Button>
              <a
                className="button outline"
                href={whatsapp("Hello ZAZOO Holidays, please share the price details for the Karnataka Coorg Adventure.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> WhatsApp for Price
              </a>
            </div>
          </div>
        </div>
        <div className="package-grid">
          {packages.slice(0, 3).map((p) => (
            <PackageCard item={p} key={p.slug} />
          ))}
        </div>
      </section>
      <section className="section story">
        <div className="story-image">
          <img
            src={image("photo-1527631746610-bca00a040d60")}
            alt="Friends enjoying a journey"
          />
          <b>
            10+<small>Destinations to begin with</small>
          </b>
        </div>
        <div>
          <Heading
            eyebrow="The ZAZOO way"
            title="Good trips don’t just happen. They’re thoughtfully made."
          />
          <p>
            From the first route map to the ride home, our team brings care,
            clarity and energy to every journey. We coordinate the moving pieces
            so your group can stay present.
          </p>
          <div className="checks">
            {[
              "Group-first planning",
              "Clear communication",
              "Flexible itineraries",
              "On-trip coordination",
            ].map((x) => (
              <span key={x}>
                <CircleCheck />
                {x}
              </span>
            ))}
          </div>
          <Button to="/about">
            Meet ZAZOO <ArrowRight />
          </Button>
        </div>
      </section>
      <section className="section quotes">
        <Heading
          eyebrow="Travel stories"
          title="Made for memories, not checklists"
        />
        <div>
          {[
            "The coordination was smooth from start to finish. Our whole class could simply enjoy the experience.",
            "A well-paced family trip with thoughtful stops and comfortable travel.",
            "Responsive, flexible and genuinely invested in making our team outing work.",
          ].map((q, i) => (
            <article key={q}>
              <span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} />
                ))}
              </span>
              <p>“{q}”</p>
              <small>
                {["College group", "Family traveler", "Corporate team"][i]}
              </small>
            </article>
          ))}
        </div>
      </section>
      <section className="cta">
        <div>
          <span>Ready when you are</span>
          <h2>Where should we go next?</h2>
          <p>
            Tell us the group, the dates and the dream. We’ll help shape the
            rest.
          </p>
        </div>
        <Button to="/plan" kind="light">
          Plan my trip <ArrowRight />
        </Button>
      </section>
    </>
  )
}
function PackageCard({ item }: { item: TripPackage }) {
  return (
    <article className="package-card">
      <Link to={`/packages/${item.slug}`} className="package-img">
        <img
          src={item.image}
          alt={`${item.destination} landscape`}
          loading="lazy"
        />
        <span>{item.category}</span>
      </Link>
      <div>
        <p className="meta">
          <span>
            <MapPin />
            {item.destination}
          </span>
          <span>
            <Clock3 />
            {item.duration}
          </span>
        </p>
        <h3>
          <Link to={`/packages/${item.slug}`}>{item.title}</Link>
        </h3>
        <p>{item.description}</p>
        <footer>
          <a
            href={whatsapp(`Hello ZAZOO Holidays, please share price details for ${item.title} (${item.destination}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-price-btn"
          >
            <MessageCircle /> WhatsApp for price details
          </a>
          <Link to={`/packages/${item.slug}`} className="view-detail-btn" title="View Details">
            <ArrowRight />
          </Link>
        </footer>
      </div>
    </article>
  )
}
export function Packages() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get("destination") || "")
  const [category, setCategory] = useState(params.get("category") || "")
  const visible = useMemo(
    () =>
      packages.filter(
        (p) =>
          (!query ||
            `${p.title} ${p.destination}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (!category || p.category === category),
      ),
    [query, category],
  )
  return (
    <>
      <Meta
        title="Tour Packages"
        description="Discover sample tours to Ooty, Kodaikanal, Munnar, Goa and more."
      />
      <PageHero
        eyebrow="Curated by ZAZOO"
        title="Discover Your Next Destination"
        text="Explore our carefully planned travel packages and make your next journey unforgettable."
      />
      <section className="section listing">
        <div className="filters">
          <label>
            <Search />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination"
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All trip categories</option>
            {categories.map((c) => (
              <option key={c[0]}>{c[0]}</option>
            ))}
          </select>
          <span>{visible.length} sample packages</span>
        </div>
        {visible.length ? (
          <div className="package-grid">
            {visible.map((p) => (
              <PackageCard item={p} key={p.slug} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Compass />
            <h2>No exact matches yet</h2>
            <p>Try another destination or let us create a custom itinerary.</p>
            <Button to="/plan">Plan a custom trip</Button>
          </div>
        )}
      </section>
    </>
  )
}
export function PackageDetail() {
  const { slug } = useParams()
  const p = packages.find((x) => x.slug === slug)
  if (!p) return <NotFound />
  return (
    <>
      <Meta
        title={`${p.destination} Tour Package`}
        description={`${p.title} sample itinerary with ZAZOO Holidays.`}
      />
      <section className="detail-hero">
        <img src={p.image} alt={p.destination} />
        <div />
        <article>
          <span>{p.category}</span>
          <h1>{p.title}</h1>
          <p>
            <MapPin /> {p.destination} · <Clock3 /> {p.duration}
          </p>
        </article>
      </section>
      <section className="section detail-layout">
        <div>
          <div className="facts">
            {[
              [TrainFront, "Transport", "AC coach"],
              [BedDouble, "Stay", "Comfort rooms"],
              [Utensils, "Meals", "As planned"],
              [Users, "Group size", "Flexible"],
            ].map(([Icon, a, b]) => (
              <div key={a as string}>
                <Icon />
                <small>{a as string}</small>
                <b>{b as string}</b>
              </div>
            ))}
          </div>
          <Heading eyebrow="Your escape" title="About this journey" />
          <p className="prose">
            {p.description} This is a sample package concept and does not
            indicate confirmed availability. Every itinerary can be adjusted to
            your starting point, dates and preferences.
          </p>
          <Heading eyebrow="Day by day" title="A simple, rewarding itinerary" />
          <div className="timeline">
            <article>
              <b>Day 01</b>
              <h3>Arrival & first impressions</h3>
              <p>
                Departure, scenic journey, destination arrival, sightseeing,
                hotel check-in and overnight stay.
              </p>
            </article>
            <article>
              <b>Day 02</b>
              <h3>Explore the destination</h3>
              <p>
                Breakfast, curated local experiences, signature viewpoints and a
                comfortable return journey.
              </p>
            </article>
            {!p.duration.startsWith("2") && (
              <article>
                <b>Day 03</b>
                <h3>One last memory</h3>
                <p>
                  Breakfast, final sightseeing stop, check-out and return
                  journey with planned breaks.
                </p>
              </article>
            )}
          </div>
          <div className="include">
            <article>
              <h3>
                <Check /> Included
              </h3>
              {[
                "Transportation",
                "Accommodation",
                "Selected meals",
                "Sightseeing",
                "Tour coordination",
              ].map((x) => (
                <p key={x}>
                  <CircleCheck />
                  {x}
                </p>
              ))}
            </article>
            <article>
              <h3>
                <X /> Not included
              </h3>
              {[
                "Personal expenses",
                "Unlisted activities",
                "Anything not mentioned",
              ].map((x) => (
                <p key={x}>
                  <X />
                  {x}
                </p>
              ))}
            </article>
          </div>
        </div>
        <aside className="booking-box">
          <small>Package Pricing</small>
          <h2 style={{ fontSize: "24px", margin: "10px 0 6px" }}>
            Price on Request
          </h2>
          <p>Pricing is tailored to your group size, dates, and stay preferences.</p>
          <a
            className="button"
            href={whatsapp(
              `Hello ZAZOO Holidays, please share the price details and full itinerary for the ${p.title} package (${p.destination}).`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle /> WhatsApp for Price Details
          </a>
          <Button to={`/book?package=${p.slug}`} kind="outline">
            Enquire Online <ArrowRight />
          </Button>
          <small>
            <ShieldCheck /> Quick response and custom group quotes on WhatsApp.
          </small>
        </aside>
      </section>
    </>
  )
}

const upcoming = [
  [
    "Kodaikanal Weekend Escape",
    "Kodaikanal",
    "18 Jul 2026",
    "19 Jul 2026",
    "Chennai",
    2499,
    "12 sample seats",
    "Booking Open",
  ],
  [
    "Munnar Monsoon Trails",
    "Munnar",
    "08 Aug 2026",
    "10 Aug 2026",
    "Coimbatore",
    4499,
    "6 sample seats",
    "Almost Full",
  ],
  [
    "Goa Friends Getaway",
    "Goa",
    "02 Oct 2026",
    "05 Oct 2026",
    "Chennai",
    7499,
    "20 sample seats",
    "Upcoming",
  ],
]
export function Upcoming() {
  return (
    <>
      <Meta
        title="Upcoming Trips"
        description="Browse upcoming sample group departures from ZAZOO Holidays."
      />
      <PageHero
        eyebrow="Pack your bags"
        title="Upcoming Group Trips"
        text="Sample departures to help you plan ahead. Contact our team for confirmed availability."
      />
      <section className="section">
        <div className="notice">
          <CalendarDays />
          <p>
            <b>Planning note:</b> Dates, seats and statuses are sample
            values—not live availability.
          </p>
        </div>
        <div className="trip-list">
          {upcoming.map((t) => (
            <article className="trip" key={t[0] as string}>
              <div className="date">
                <span>{(t[2] as string).split(" ")[1]}</span>
                <b>{(t[2] as string).split(" ")[0]}</b>
                <small>2026</small>
              </div>
              <div>
                <span className="status">{t[7]}</span>
                <h2>{t[0]}</h2>
                <p>
                  <MapPin />
                  {t[1]}
                </p>
                <div className="trip-meta">
                  <span>
                    <CalendarDays />
                    {t[2]} — {t[3]}
                  </span>
                  <span>
                    <Route />
                    From {t[4]}
                  </span>
                  <span>
                    <Users />
                    {t[6]}
                  </span>
                </div>
              </div>
              <aside>
                <small>Pricing</small>
                <b>On Request</b>
                <a
                  className="button"
                  href={whatsapp(`Hello ZAZOO Holidays, please share price details for ${t[0]} (${t[1]}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: "10px", display: "inline-flex" }}
                >
                  <MessageCircle /> WhatsApp for price
                </a>
              </aside>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <label>
      <span>
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        min={type === "number" ? 0 : undefined}
        pattern={type === "tel" ? "[0-9+ ]{10,15}" : undefined}
      />
    </label>
  )
}
function Success({ refId, text }: { refId: string; text: string }) {
  return (
    <div className="success">
      <span>
        <Check />
      </span>
      <h2>Enquiry received</h2>
      <p>{text}</p>
      <b>Reference: {refId}</b>
      <a href={WA} className="button outline">
        <MessageCircle /> Continue on WhatsApp
      </a>
    </div>
  )
}
export function Booking() {
  const [params] = useSearchParams()
  const selected = packages.find((p) => p.slug === params.get("package"))
  const [done, setDone] = useState("")
  return (
    <>
      <Meta
        title="Booking Enquiry"
        description="Send a travel enquiry to ZAZOO Holidays."
      />
      <PageHero
        eyebrow="Start your journey"
        title="Booking Enquiry"
        text="Share a few details and our team will help you shape the right trip."
      />
      <section className="section form-section">
        {done ? (
          <Success
            refId={done}
            text="Thank you for choosing ZAZOO Holidays! Our team will contact you shortly. This does not confirm a booking."
          />
        ) : (
          <div className="form-shell">
            <aside>
              <Heading
                eyebrow="Let’s make a plan"
                title="Tell us about your trip"
              />
              <p>
                Submitting creates an enquiry only. Our team will contact you
                with availability and final details.
              </p>
              <b>
                <Phone />
                {PHONE}
              </b>
              <b>
                <MessageCircle />
                WhatsApp our team
              </b>
            </aside>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setDone(`ZH-${Date.now().toString().slice(-6)}`)
              }}
            >
              <FormGrid>
                <Field label="Customer name" name="name" required />
                <Field label="Mobile number" name="phone" type="tel" required />
                <Field label="Email address" name="email" type="email" />
                <label>
                  <span>Selected package *</span>
                  <select required defaultValue={selected?.slug || ""}>
                    <option value="">Choose a package</option>
                    {packages.map((p) => (
                      <option value={p.slug} key={p.slug}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </label>
                <Field label="Travel date" name="date" type="date" required />
                <Field
                  label="Number of travelers"
                  name="travelers"
                  type="number"
                  required
                />
                <Field label="Starting location" name="start" required />
                <label className="wide">
                  <span>Special requirements</span>
                  <textarea rows={4} />
                </label>
              </FormGrid>
              <Button>
                Send enquiry <Send />
              </Button>
              <small>
                <ShieldCheck /> Your details are used only to respond to this
                enquiry.
              </small>
            </form>
          </div>
        )}
      </section>
    </>
  )
}
function FormGrid({ children }: { children: ReactNode }) {
  return <div className="form-grid">{children}</div>
}
export function Planner() {
  const [done, setDone] = useState("")
  const [error, setError] = useState("")
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    if (String(d.get("return")) < String(d.get("departure")))
      return setError("Return date must be after departure.")
    setDone(`ZP-${Date.now().toString().slice(-6)}`)
  }
  return (
    <>
      <Meta
        title="Custom Trip Planner"
        description="Plan a custom group journey with ZAZOO Holidays."
      />
      <PageHero
        eyebrow="Built around you"
        title="Plan Your Perfect Trip"
        text="Tell us your travel preferences. Our team will help you plan a memorable journey."
      />
      <section className="section form-section">
        {done ? (
          <Success
            refId={done}
            text="Your preferences are ready for our planning team. We’ll contact you to discuss the next steps."
          />
        ) : (
          <form className="planner" onSubmit={submit}>
            <FormBlock n="01" title="About you">
              <FormGrid>
                <Field label="Full name" name="name" required />
                <Field label="Mobile number" name="phone" type="tel" required />
                <Field label="Email address" name="email" type="email" />
              </FormGrid>
            </FormBlock>
            <FormBlock n="02" title="Trip details">
              <FormGrid>
                <Field label="Starting location" name="start" required />
                <Field label="Destination" name="destination" required />
                <label>
                  <span>Trip category *</span>
                  <select required>
                    <option value="">Choose category</option>
                    {categories.map((c) => (
                      <option key={c[0]}>{c[0]}</option>
                    ))}
                  </select>
                </label>
                <Field
                  label="Departure date"
                  name="departure"
                  type="date"
                  required
                />
                <Field label="Return date" name="return" type="date" required />
                <Field
                  label="Number of travelers"
                  name="travelers"
                  type="number"
                  required
                />
                <Field label="Adults" name="adults" type="number" />
                <Field label="Children" name="children" type="number" />
              </FormGrid>
              {error && <p className="error">{error}</p>}
            </FormBlock>
            <FormBlock n="03" title="Preferences">
              <FormGrid>
                <Field label="Budget per person" name="budget" />
                <Field label="Transportation" name="transport" />
                <Field label="Accommodation" name="stay" />
                <Field label="Food preference" name="food" />
                <label className="wide">
                  <span>Additional requirements</span>
                  <textarea rows={4} />
                </label>
              </FormGrid>
            </FormBlock>
            <Button>
              Submit trip plan <ArrowRight />
            </Button>
          </form>
        )}
      </section>
    </>
  )
}
function FormBlock({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: ReactNode
}) {
  return (
    <fieldset>
      <legend>
        <span>{n}</span>
        {title}
      </legend>
      {children}
    </fieldset>
  )
}
export function About() {
  const why = [
    [Map, "Reliable Travel Planning"],
    [TrainFront, "Comfortable Transportation"],
    [Sparkles, "Customized Tour Packages"],
    [BadgeCheck, "Experienced Trip Coordination"],
    [Users, "Group Travel Management"],
    [Headphones, "Customer Support"],
  ] as const
  return (
    <>
      <Meta
        title="About Us"
        description="Meet ZAZOO Holidays, creating thoughtful travel experiences across Tamil Nadu."
      />
      <PageHero
        eyebrow="More than an itinerary"
        title="We make the journey feel easy"
        text="Purposeful planning, warm coordination and trips that bring people closer."
      />
      <section className="section about">
        <Heading
          eyebrow="Hello from ZAZOO"
          title="Travel experiences designed around real people."
        />
        <div>
          <p>
            ZAZOO Holidays is a travel agency dedicated to creating memorable
            travel experiences. We organize college industrial visits, school
            tours, family vacations, corporate outings, and adventure trips
            across Tamil Nadu and beyond.
          </p>
          <p>
            Our mission is to remove stress from group travel and replace it
            with thoughtful details, clear coordination and room for genuine
            connection.
          </p>
        </div>
      </section>
      <section className="values">
        <article>
          <span>Our mission</span>
          <h2>
            Make every journey organized, inclusive and worth remembering.
          </h2>
        </article>
        <article>
          <span>Our vision</span>
          <h2>
            Become Tamil Nadu’s most trusted name for joyful group travel.
          </h2>
        </article>
      </section>
      <section className="section">
        <Heading
          eyebrow="Why travel with us"
          title="Care in every moving part"
        />
        <div className="why">
          {why.map(([Icon, title]) => (
            <article key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>
                Thoughtful support from the first conversation through the
                journey home.
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
export function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <Meta
        title="Contact Us"
        description="Contact ZAZOO Holidays by phone, WhatsApp or Instagram."
      />
      <PageHero
        eyebrow="We’d love to hear from you"
        title="Let’s talk travel"
        text="Have a destination in mind, or need help finding one? Reach our team your way."
      />
      <section className="section contact">
        <div className="contact-links">
          <a href={`tel:${PHONE.replaceAll(" ", "")}`}>
            <Phone />
            <span>
              Call us<b>{PHONE}</b>
            </span>
            <ChevronRight />
          </a>
          <a href={WA}>
            <MessageCircle />
            <span>
              WhatsApp<b>Start a conversation</b>
            </span>
            <ChevronRight />
          </a>
          <a href="https://instagram.com/zazoo_holidays_official">
            <Camera />
            <span>
              Instagram<b>@zazoo_holidays_official</b>
            </span>
            <ChevronRight />
          </a>
          <div>
            <MapPin />
            <span>
              Service coverage<b>All over Tamil Nadu</b>
            </span>
          </div>
        </div>
        {sent ? (
          <Success
            refId={`ZM-${Date.now().toString().slice(-6)}`}
            text="Thanks for reaching out. Our team will respond as soon as possible."
          />
        ) : (
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <h2>Send us a message</h2>
            <p>We usually respond fastest by phone or WhatsApp.</p>
            <FormGrid>
              <Field label="Name" name="name" required />
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="Email" name="email" type="email" />
              <Field label="Subject" name="subject" required />
              <label className="wide">
                <span>Message *</span>
                <textarea required rows={5} />
              </label>
            </FormGrid>
            <Button>
              Send message <Send />
            </Button>
          </form>
        )}
      </section>
    </>
  )
}
export function AdminLogin() {
  const nav = useNavigate()
  const [error, setError] = useState("")
  return (
    <>
      <Meta
        title="Admin Login"
        description="Secure ZAZOO Holidays administration portal."
      />
      <section className="login">
        <div>
          <Brand />
          <span className="lock">
            <LockKeyhole />
          </span>
          <h1>Admin access</h1>
          <p>Sign in with an authorized administrator account.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setError(
                "Secure authentication requires the requested Supabase connection. Public access remains disabled.",
              )
            }}
          >
            <Field label="Email address" name="email" type="email" required />
            <Field label="Password" name="password" type="password" required />
            <Button>
              Secure sign in <ArrowRight />
            </Button>
            {error && <p className="error">{error}</p>}
          </form>
          <button
            className="preview"
            onClick={() => nav("/admin?preview=true")}
          >
            View read-only dashboard preview
          </button>
        </div>
      </section>
    </>
  )
}
export function Admin() {
  const [params] = useSearchParams()
  if (params.get("preview") !== "true") return <AdminLogin />
  const stats = [
    ["Total packages", "10", Map],
    ["Total enquiries", "24", Mail],
    ["Upcoming trips", "3", CalendarDays],
    ["Pending enquiries", "8", Clock3],
  ] as const
  return (
    <>
      <Meta
        title="Admin Dashboard Preview"
        description="Read-only ZAZOO Holidays dashboard preview."
      />
      <section className="admin">
        <aside>
          <Brand light />
          <nav>
            <a>
              <LayoutDashboard />
              Overview
            </a>
            <a>
              <Map />
              Packages
            </a>
            <a>
              <CalendarDays />
              Upcoming trips
            </a>
            <a>
              <Mail />
              Enquiries
            </a>
          </nav>
          <small>
            <LockKeyhole /> Preview mode
          </small>
        </aside>
        <main>
          <header>
            <div>
              <span>Dashboard preview</span>
              <h1>Good morning, ZAZOO</h1>
            </div>
            <Button>
              <Plus /> Add package
            </Button>
          </header>
          <div className="admin-note">
            <ShieldCheck />
            <p>
              <b>Read-only preview.</b> Connect Supabase to enable
              authentication, live analytics and management.
            </p>
          </div>
          <div className="stats">
            {stats.map(([label, value, Icon]) => (
              <article key={label}>
                <span>
                  <Icon />
                </span>
                <p>{label}</p>
                <b>{value}</b>
                <small>Sample data</small>
              </article>
            ))}
          </div>
          <section className="panel">
            <h2>Recent enquiries</h2>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Trip</th>
                    <th>Travel date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "ZH-240118",
                      "Arun Kumar",
                      "Kodaikanal",
                      "18 Jul 2026",
                      "New",
                    ],
                    [
                      "ZH-240117",
                      "Priya S",
                      "Munnar",
                      "08 Aug 2026",
                      "Contacted",
                    ],
                    [
                      "ZH-240116",
                      "College Group",
                      "Ooty",
                      "12 Sep 2026",
                      "Pending",
                    ],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((x, i) => (
                        <td key={x}>{i === 4 ? <span>{x}</span> : x}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </section>
    </>
  )
}
export function NotFound() {
  return (
    <section className="not-found">
      <Compass />
      <span>404</span>
      <h1>This road ends here</h1>
      <p>Let’s get you back to a journey worth taking.</p>
      <Button to="/">Back to home</Button>
    </section>
  )
}
