import "./landing.css";
import { useNavigate, Link } from "react-router-dom";


export default function Landing() {
  return (
    <div className="hero">
      <div className="overlay">
        <div className="hero-content">
          <h1>
            Certificate <span>Manager</span>
          </h1>
          <p>
            Securely upload, manage and access your certificates anytime,
            anywhere.
          </p>

          <div className="hero-buttons">
            <Link to="/login">
              <button className="btn primary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn secondary">Signup</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}