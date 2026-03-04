import { useState } from "react";
import { uploadCertificate } from "../services/api";
import "../styles/upload.css";

export default function Upload() {

  const [mode, setMode] = useState("single");

  const [title, setTitle] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const [file, setFile] = useState(null);

  const [bulkCertificates, setBulkCertificates] = useState([]);

  const handleBulkFiles = (e) => {

    const selectedFiles = Array.from(e.target.files);

    const certs = selectedFiles.map((f) => ({
      file: f,
      title: "",
      issue_date: "",
      expire_date: ""
    }));

    setBulkCertificates(certs);
  };

  const handleBulkChange = (index, field, value) => {

    const updated = [...bulkCertificates];

    updated[index][field] = value;

    setBulkCertificates(updated);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    try {

      if (mode === "single") {

        const formData = new FormData();

        formData.append("title", title);
        formData.append("issue_date", issueDate);
        formData.append("expire_date", expireDate);
        formData.append("files", file);

        await uploadCertificate(formData, token);

      } else {

        for (const cert of bulkCertificates) {

          const formData = new FormData();

          formData.append("title", cert.title);
          formData.append("issue_date", cert.issue_date);
          formData.append("expire_date", cert.expire_date);
          formData.append("files", cert.file);

          await uploadCertificate(formData, token);

        }

      }

      alert("Upload successful!");

      setTitle("");
      setIssueDate("");
      setExpireDate("");
      setFile(null);
      setBulkCertificates([]);

    } catch (err) {

      console.error(err);
      alert("Upload failed");

    }

  };

  return (

    <div className="upload-page">

      <div className="upload-card">

        <h2>Upload Certificates</h2>

        {/* Upload Mode Toggle */}

        <div className="upload-mode">

          <button
            className={mode === "single" ? "mode-btn active" : "mode-btn"}
            onClick={() => setMode("single")}
            type="button"
          >
            Single Upload
          </button>

          <button
            className={mode === "bulk" ? "mode-btn active" : "mode-btn"}
            onClick={() => setMode("bulk")}
            type="button"
          >
            Bulk Upload
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          {/* ---------- SINGLE UPLOAD ---------- */}

          {mode === "single" && (

            <>

              <div className="form-group">

                <label>Certificate Title</label>

                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

              </div>

              <div className="row">

                <div className="form-group">

                  <label>Issue Date</label>

                  <input
                    type="date"
                    required
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />

                </div>

                <div className="form-group">

                  <label>Expiry Date</label>

                  <input
                    type="date"
                    required
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                  />

                </div>

              </div>

              <div className="form-group">

                <label>Upload Certificate</label>

                <input
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />

              </div>

            </>

          )}

          {/* ---------- BULK UPLOAD ---------- */}

          {mode === "bulk" && (

            <>

              <div className="form-group">

                <label>Select Multiple Certificates</label>

                <input
                  type="file"
                  multiple
                  required
                  onChange={handleBulkFiles}
                />

              </div>

              {bulkCertificates.map((cert, index) => (

                <div key={index} className="bulk-cert-section">

                  <h4>
                    Document {index + 1}: {cert.file.name}
                  </h4>

                  <div className="form-group">

                    <label>Title</label>

                    <input
                      type="text"
                      placeholder="Certificate Title"
                      value={cert.title}
                      onChange={(e) =>
                        handleBulkChange(index, "title", e.target.value)
                      }
                    />

                  </div>

                  <div className="row">

                    <div className="form-group">

                      <label>Issue Date</label>

                      <input
                        type="date"
                        value={cert.issue_date}
                        onChange={(e) =>
                          handleBulkChange(index, "issue_date", e.target.value)
                        }
                      />

                    </div>

                    <div className="form-group">

                      <label>Expiry Date</label>

                      <input
                        type="date"
                        value={cert.expire_date}
                        onChange={(e) =>
                          handleBulkChange(index, "expire_date", e.target.value)
                        }
                      />

                    </div>

                  </div>

                </div>

              ))}

            </>

          )}

          <button type="submit" className="upload-btn">
            Upload
          </button>

        </form>

      </div>

    </div>

  );
}