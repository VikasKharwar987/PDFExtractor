import { useState } from "react";
import { uploadCertificate } from "../services/api";
import "../styles/upload.css";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("issue_date", issueDate);
    formData.append("expire_date", expireDate);
    formData.append("file", file);

    await uploadCertificate(formData, token);
    alert("Uploaded!");
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>Upload Certificate</h2>
        <p>Add your new certificate details below</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Certificate Title</label>
            <input
              type="text"
              placeholder="e.g. AWS Cloud Practitioner"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>Issue Date</label>
              <input
                type="date"
                required
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                required
                onChange={(e) => setExpireDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Upload File</label>
            <div className="file-upload">
              <input
                type="file"
                required
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span>
                {file ? file.name : "Click to select certificate file"}
              </span>
            </div>
          </div>

          <button type="submit" className="upload-btn">
            Upload Certificate
          </button>
        </form>
      </div>
    </div>
  );
}