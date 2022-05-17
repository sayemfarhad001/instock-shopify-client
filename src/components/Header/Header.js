import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/InStock-Logo.svg";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <div className="header__nav">
        <div className="header__container">
          <Link to="/">
            <img src={logo} className="Instock__logo" alt="logo"></img>
          </Link>
        </div>

        <div className="header__container">
          <Link to="/">
            <button className="header__warehouses">Warehouses</button>
          </Link>

          <Link to= "/inventories">
            <button className="header__inventory">Inventory</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
