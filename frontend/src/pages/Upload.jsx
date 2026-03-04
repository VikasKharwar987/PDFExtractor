import { useState } from "react";
import { uploadCertificate } from "../services/api";
import "../styles/upload.css";

export default function Upload() {

  const [title, setTitle] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {

  e.preventDefault();

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("title", title);
  formData.append("issue_date", issueDate);
  formData.append("expire_date", expireDate);

  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  await uploadCertificate(formData, token);

  alert("Certificates uploaded successfully!");

};

  return (

    <div className="upload-page">

      <div className="upload-card">

        <h2>Upload Certificates</h2>
        <p>Add one or multiple certificates</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Certificate Title</label>

            <input
              type="text"
              placeholder="e.g. AWS Cloud Practitioner"
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

            <label>Upload Certificates</label>

            <div className="file-upload">

              <input
                type="file"
                multiple
                required
                onChange={(e) => setFiles(e.target.files)}
              />

              <span>
                {files.length > 0
                  ? `${files.length} files selected`
                  : "Click to select certificate files"}
              </span>

            </div>

          </div>

          <button type="submit" className="upload-btn">
            Upload Certificates
          </button>

        </form>

      </div>

    </div>

  );
}