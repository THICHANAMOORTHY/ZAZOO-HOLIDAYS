import { createBrowserRouter } from "react-router"
import {
  About,
  Admin,
  AdminLogin,
  Booking,
  Contact,
  Home,
  NotFound,
  PackageDetail,
  Packages,
  Planner,
  Root,
  Upcoming,
} from "./site"
import {
  CollegeToursPage,
  SchoolToursPage,
  FamilyTripsPage,
  CorporateToursPage,
  UnofficialTripsPage,
  OotyPage,
  KodaikanalPage,
  MunnarPage,
  CoorgPage,
  PrivacyPage,
  TermsPage,
} from "./landingPages"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "packages", Component: Packages },
      { path: "packages/:slug", Component: PackageDetail },
      { path: "upcoming", Component: Upcoming },
      { path: "plan", Component: Planner },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "book", Component: Booking },

      // Service SEO landing pages
      { path: "services/college-tours", Component: CollegeToursPage },
      { path: "services/school-tours", Component: SchoolToursPage },
      { path: "services/family-trips", Component: FamilyTripsPage },
      { path: "services/corporate-tours", Component: CorporateToursPage },
      { path: "services/unofficial-trips", Component: UnofficialTripsPage },

      // Destination SEO landing pages
      { path: "destinations/ooty", Component: OotyPage },
      { path: "destinations/kodaikanal", Component: KodaikanalPage },
      { path: "destinations/munnar", Component: MunnarPage },
      { path: "destinations/coorg", Component: CoorgPage },

      // Legal & Trust pages
      { path: "privacy", Component: PrivacyPage },
      { path: "terms", Component: TermsPage },

      // Admin & Fallback
      { path: "admin/login", Component: AdminLogin },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
])
