import React from "react";
import logo from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__info">
        <img className="header__logo" src={logo} alt="logo" />



        {location.pathname === '/signin' && (
          <Link to="/signup" className="header__link">
            Regístrate
          </Link>
        )}

        {location.pathname === '/signup' && (
          <Link to="/signin" className="header__link">
            Inicia sesión
          </Link>
        )}

        {
          location.pathname === '/' &&
          <>
            <p className="header__email">{props.email}</p>
            <button className="header__logout" onClick={props.handleLogout}>Cerrar sesión</button>
          </>
        }
      </div>
      <hr className="header__line" />
    </header>
  );
}
