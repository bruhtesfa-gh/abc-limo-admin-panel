import React from "react";
import MenuLogo from "./MenuLogo";
import { Link, NavLink } from "react-router-dom";

function Menu() {
  return (
    <aside
      style={{
        position: "sticky",
        top: "0",
        left: "0",
        height: "100vh",
      }}
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <MenuLogo />
      <div className="menu-inner-shadow"></div>
      <ul className="menu-inner py-1">
        {/* <!-- Dashboard --> */}
        <NavLink to="/" className="menu-item ">
          <div className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </div>
        </NavLink>
        <NavLink to="/vehicles" className="menu-item ">
          <div className="menu-link">
            <i className="menu-icon tf-icons bx bxs-car"></i>
            <div data-i18n="Analytics">vehicle</div>
          </div>
        </NavLink>
        <NavLink to="/reservations" className="menu-item ">
          <div className="menu-link">
            <i className="menu-icon tf-icons bx bx-calendar"></i>
            <div data-i18n="Analytics">Booking</div>
          </div>
        </NavLink>
        <NavLink to="/blogs" className="menu-item ">
          <div className="menu-link">
            <i className="menu-icon tf-icons bx bxl-blogger"></i>
            <div data-i18n="Analytics">Blog</div>
          </div>
        </NavLink>
        <NavLink to="/services" className="menu-item ">
          <div className="menu-link">
            <i className="menu-icon tf-icons bx bx-cog"></i>
            <div data-i18n="Analytics">Service</div>
          </div>
        </NavLink>
      </ul>
    </aside>
  );
}

export default Menu;
