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
      { path: "admin/login", Component: AdminLogin },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
])
