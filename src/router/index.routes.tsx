import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "../components/layout/Root.layout";
import Account from "../pages/Account";
import Blog from "../pages/Blog";
import Blogs from "../pages/Blogs";
import Booking from "../pages/Booking";
import Bookings from "../pages/Bookings";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Vehicle from "../pages/Vehicle";
import Vehicles from "../pages/Vehicles";
import ErrorPage from "../pages/ErrorPage";
import Services from "../pages/Services";
import Service from "../pages/Service";

function Router({ isAuth }: { isAuth: boolean }) {
  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="account" element={<Account />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/:id?" element={<Blog />} />
            <Route path="reservations" element={<Bookings />} />
            <Route path="reservation/:id" element={<Booking />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="vehicle/:id?" element={<Vehicle />} />
            <Route path="services" element={<Services />} />
            <Route path="service/:id?" element={<Service />} />
            {/* <Route path="/" element={<Form />} /> */}
          </Route>
        ) : (
          <Route path="/" element={<LoginPage />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
