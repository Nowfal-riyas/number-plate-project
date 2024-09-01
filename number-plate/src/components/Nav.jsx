import React from "react";
import "./Nav.css";
import Icon from "../assets/search_icon.png";
import { NavLink, useLocation } from "react-router-dom";

const Nav = ({ inputvalue, handleClick, handleChange, handleResetClick}) => {
  const location = useLocation();
  return (
    <>
      <nav className="navbar">
        {location.pathname === "/" && (
          <div className="number_info">
            <input
              type="text"
              className="number_info_input"
              placeholder="Enter Vehicle Number"
              value={inputvalue}
              onChange={handleChange}
              maxLength="10"
              title="Please enter a value in the format: TN11X1111 or TN99XX9999"
              required
            />
            <button className="number_search" onClick={handleClick}>
              Search
            </button>
            <button className="number_search" onClick={handleResetClick}>
              Reset
            </button>
          </div>
        )}
        <div className="add_find_section">
          <NavLink to="/" className="links">
            Home
          </NavLink>
          <NavLink to="/addnew" className="links">
            Add New
          </NavLink>
          <NavLink to="/User" className="links">
            All User
          </NavLink>
          <NavLink to="/exuser" className="find_user">
            <img src={Icon} alt="" className="icon_img" />
            Find User
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Nav;
