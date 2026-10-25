import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="brand-lockup">
        <img className="brand-mark" src="/ai-study-logo.svg" alt="" />
        <span>AI / STUDY</span>
      </h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/assistant">Assistant</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;