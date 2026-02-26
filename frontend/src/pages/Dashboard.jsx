import { useEffect, useState } from "react";
import { getCertificates } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await getCertificates(token);
      const data = await res.json();
      setCerts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Your Certificates</h2>
        <Link to="/upload">
          <button className="btn primary">Upload New</button>
        </Link>
      </div>

      <div className="cert-grid">
        {certs.map((cert) => (
          <div key={cert.id} className="cert-card">
            <h3>{cert.title}</h3>
            <p><strong>Issue:</strong> {cert.issue_date}</p>
            <p><strong>Expire:</strong> {cert.expire_date}</p>

            <div className="cert-actions">
              <a href={cert.file_url} target="_blank">Preview</a>
              <a href={cert.file_url} download>Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}