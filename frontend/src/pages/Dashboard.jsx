import { useEffect, useState } from "react";
import { getCertificates } from "../services/api";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await getCertificates(token);
        const data = await res.json();
        setCerts(data);
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      }
    };
    fetchData();
  }, []);

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expire = new Date(expiryDate);
    return expire < today ? "expired" : "active";
  };

  return (
    <main className="dashboard-wrapper">
      <div className="container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Your Certificates</h1>
            <p className="subtitle">{certs.length} Documents Found</p>
          </div>
          <Link to="/upload" className="upload-link">
            <button className="btn-primary">
              <span className="plus-icon">+</span> Upload New
            </button>
          </Link>
        </header>

        {certs.length > 0 ? (
          <div className="cert-grid">
            {certs.map((cert) => (
              <div key={cert.id} className="cert-card">
                <div className="cert-card-header">
                  <span className={`badge ${getStatus(cert.expire_date)}`}>
                    {getStatus(cert.expire_date)}
                  </span>
                  <div className="icon-holder">📄</div>
                </div>
                
                <div className="cert-body">
                  <h3>{cert.title}</h3>
                  <div className="date-group">
                    <div className="date-item">
                      <small>Issued</small>
                      <p>{cert.issue_date}</p>
                    </div>
                    <div className="date-item">
                      <small>Expires</small>
                      <p className={getStatus(cert.expire_date) === 'expired' ? 'exp-text' : ''}>
                        {cert.expire_date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="cert-footer">
                  <a href={cert.file_url} target="_blank" rel="noreferrer" className="action-btn preview">
                    Preview
                  </a>
                  <a href={cert.file_url} download className="action-btn download">
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No certificates found. Start by uploading one!</p>
          </div>
        )}
      </div>
    </main>
  );
}