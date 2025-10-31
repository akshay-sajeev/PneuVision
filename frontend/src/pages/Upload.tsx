import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/upload.css";
import ProfileBar from "../components/ProfileBar";
import Navbar from "../components/Navbar";
import "../styles/App.css";


export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function onChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
  }


  return (
    <div className="up-root">
      <Navbar />
      <ProfileBar />
      

      <main className="up-main">
        <h2 className="up-section-title">Upload File</h2>

        <form className="up-form" onSubmit={onSubmit}>
          <input
            className="up-file"
            type="file"
            accept="image/*"
            onChange={onChoose}
          />
          <button className="up-btn" type="submit" disabled={!file}>
            UPLOAD
          </button>
        </form>

        {previewUrl && (
          <div className="up-preview">
            <img src={previewUrl} alt="X-ray" />
          </div>
        )}
      </main>
    </div>
  );
}
