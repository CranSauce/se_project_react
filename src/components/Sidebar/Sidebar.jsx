import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Sidebar.css";

function Sidebar({handleEditClick, handleSignOut}) {
  const currentUser = useContext(CurrentUserContext);  

 
  const avatar = currentUser?.avatar || null;
  const username = currentUser?.name || "Guest";
  const userInitial = currentUser?.name?.charAt(0).toUpperCase();  

  return (
    <div className="sidebar">
      {avatar ? (
        <img className="sidebar__avatar" src={avatar} alt="User avatar" />
      ) : (
        <div className="sidebar__avatar sidebar__avatar-placeholder">
          {userInitial || "?"} 
        </div>
      )}
      <p className="sidebar__username">{username}</p>
      <div className="sidebar__buttons">
      <button type="button" onClick={handleEditClick} className="sidebar__edit-btn">Change User Data</button>
      <button type="button" onClick={handleSignOut} className="sidebar__signout-btn">Log Out</button>
      </div>
    </div>
    
  );
}

export default Sidebar;
