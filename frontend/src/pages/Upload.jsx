import { useState } from "react";
import { uploadCertificate } from "../services/api";
import "../styles/upload.css";

export default function Upload() {

  const [mode, setMode] = useState("single");

  const [title, setTitle] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("issue_date", issueDate);
    formData.append("expire_date", expireDate);

    if (mode === "single") {
      formData.append("files", file);
    } else {
      Array.from(files).forEach((f) => {
        formData.append("files", f);
      });
    }

    await uploadCertificate(formData, token);

    alert("Upload successful!");

    setTitle("");
    setIssueDate("");
    setExpireDate("");
    setFile(null);
    setFiles([]);
  };

  return (
    <div className="upload-page">

      <div className="upload-card">

        <h2>Upload Certificates</h2>

        {/* Mode Switch Buttons */}

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

          {/* File Upload Section */}

          <div className="form-group">

            <label>
              {mode === "single"
                ? "Upload Certificate"
                : "Upload Multiple Certificates"}
            </label>

            <div className="file-upload">

              {mode === "single" ? (

                <input
                  type="file"
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />

              ) : (

                <input
                  type="file"
                  multiple
                  required
                  onChange={(e) => setFiles(e.target.files)}
                />

              )}

              <span>

                {mode === "single"
                  ? file
                    ? file.name
                    : "Click to select certificate"
                  : files.length > 0
                  ? `${files.length} files selected`
                  : "Click to select multiple certificates"}

              </span>

            </div>

          </div>

          <button type="submit" className="upload-btn">
            Upload
          </button>

        </form>

      </div>

    </div>
  );
}