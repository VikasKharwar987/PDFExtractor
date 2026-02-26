import { useState } from "react";
import { uploadCertificate } from "../services/api";

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
    <div className="container card">
      <h2>Upload Certificate</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
        <input type="date" onChange={(e)=>setIssueDate(e.target.value)} />
        <input type="date" onChange={(e)=>setExpireDate(e.target.value)} />
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}