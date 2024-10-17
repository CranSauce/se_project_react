import { useContext } from "react";
import avatarPlaceholder from "../../assets/Ellipse18.svg";  // Default avatar image
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./Sidebar.css";

function Sidebar() {
  const currentUser = useContext(CurrentUserContext);  // Get current user data from context

  // Check if the user has an avatar or fallback to first letter of name in uppercase
  const avatar = currentUser?.avatar || null;
  const username = currentUser?.name || "Guest";
  const userInitial = currentUser?.name?.charAt(0).toUpperCase();  // First letter of name in uppercase

  return (
    <div className="sidebar">
      {avatar ? (
        <img className="sidebar__avatar" src={avatar} alt="User avatar" />
      ) : (
        <div className="sidebar__avatar sidebar__avatar-placeholder">
          {userInitial || "?"} {/* Show initial or '?' if user is Guest */}
        </div>
      )}
      <p className="sidebar__username">{username}</p>
    </div>
  );
}

export default Sidebar;
