import avatar from "../../assets/Ellipse18.svg";
import "./Sidebar.css";

function Sidebar() {
    return(
        <div className="sidebar">
            <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
            <p className="sidebar__username">User name</p>
        </div>
    );
}

export default Sidebar;