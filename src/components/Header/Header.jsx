import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Ellipse18.svg";


function Header({ handleAddClick }) {
    return (
        <header className="header">
          <img className="header__logo" src={logo}/>
          <p className="header__date-and-location">DATE, LOCATION</p>  
          <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">+ Add Clothes</button>
           <div className="header__user-container">
            <p className="header__username">Name</p>
            <img src={avatar} alt="" className="header__avatar" />
           </div>
        </header>
    )
}

export default Header;