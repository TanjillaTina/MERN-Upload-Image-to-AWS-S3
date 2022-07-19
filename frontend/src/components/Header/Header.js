//Header
import "./Header.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  console.log(location.pathname); // path is /contact

  return (
    <div className="topnav">
      <li className={location.pathname === "/" ? "active" : "inactive"}>
        <Link to="/">Add New Image</Link>
      </li>
      <li className={location.pathname === "/view-all" ? "active" : "inactive"}>
        <Link to="/view-all">View All Image</Link>
      </li>
    </div>
  );
};

export default Header;
