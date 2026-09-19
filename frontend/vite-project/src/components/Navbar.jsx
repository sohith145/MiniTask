import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        MiniTask
      </Link>

      <div className="navbar-links">
        <Link to="/login" className="navbar-login">
          Log in
        </Link>
        <Link to="/register" className="navbar-get-started">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;