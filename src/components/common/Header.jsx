import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <h2 className="logo">
        <i className="bi bi-house"></i> Real Estate
      </h2>

      <nav>
        <Link to="/">Home</Link>
      </nav>

      <div>
        {!user ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </header>
  );
};

export default Header;
