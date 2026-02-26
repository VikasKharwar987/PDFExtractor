import { Link } from "react-router-dom";
import "./landing.css";

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
            <button className="btn primary">Login</button>
            <button className="btn secondary">Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}