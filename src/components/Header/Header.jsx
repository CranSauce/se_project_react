import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext"; 

function Header({ handleAddClick, handleLoginClick, handleSignupClick, handleSignOut, weatherData, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  
  const placeholderAvatar = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : null;

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" alt="Logo" src={logo} />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch />
        {!currentUser ? (
          <div className="header__auth-buttons">
            <button onClick={handleSignupClick} type="button" className="header__signup-btn">
              Sign Up
            </button>
            <button onClick={handleLoginClick} type="button" className="header__login-btn">
              Log In
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <button
              onClick={handleSignOut}
              type="button"
              className="header__edit-profile-btn"
            >
              Sign Out
            </button>

            <Link to="/profile" className="user-info">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {placeholderAvatar}
                </div>
              )}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
