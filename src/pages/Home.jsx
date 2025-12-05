import { Link } from "react-router-dom";
import logo from "../assets/logo/ashkanai-light.png";

export default function Home() {
  return (
    <div className="container py-5 fade-in">

      <div className="text-center mb-5">
        <img 
          src={logo} 
          alt="AshkanAI" 
          style={{ width: 120, marginBottom: 20 }} 
          className="hero-logo"
        />

        <h1 className="display-4 fw-bold mb-3">
          Welcome to <span className="text-primary">AshkanAI</span>
        </h1>

        <p className="lead text-muted mb-4">
          The next generation of intelligent, fast, and beautifully designed AI.
          <br />
          Crafted with precision and modern UX for a seamless experience.
        </p>

        <Link className="btn btn-primary btn-lg px-5 py-2 shadow rounded-pill" to="/dashboard">
          Enter Dashboard
        </Link>
      </div>

      <div className="text-center text-muted mt-5">
        © {new Date().getFullYear()} AshkanAI — All rights reserved.
      </div>

    </div>
  );
}
