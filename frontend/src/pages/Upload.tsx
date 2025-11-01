import { useState, useEffect, useRef } from "react";
import "../styles/upload.css";
import ProfileBar from "../components/ProfileBar";
import Navbar from "../components/Navbar";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement | null>(null);

  function onChoose(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResultImage(null);
    setLabel(null);
    setConfidence(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5001/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setResultImage(`http://localhost:5001${data.image_path}`);
      setLabel(data.label);
      setConfidence(data.confidence);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (resultImage && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultImage]);

  return (
    <div className="up-root">
      <Navbar />
      <ProfileBar />

      <main className="up-main">
        <h2 className="up-section-title">Upload Chest X-Ray</h2>

        <form className="up-form" onSubmit={onSubmit}>
          <label htmlFor="file-upload" className="up-upload-area">
            {previewUrl ? (
              <>
                <img
                  src={previewUrl}
                  alt="Uploaded X-ray"
                  className="up-preview-inside"
                />
                <div className="up-replace-overlay">↻ Replace Image</div>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="-1 0 26 24"
                  fill="none"
                  stroke="#7b4ff3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginBottom: "8px" }}
                >
                  <path d="M4 14.5A5.5 5.5 0 0 1 9.5 9H10a5 5 0 0 1 9.9 1h.6a3.5 3.5 0 0 1 0 7H19" />
                  <path d="M12 12v9" />
                  <path d="m8 16 4-4 4 4" />
                </svg>
                <p>
                  <strong>Click to upload</strong> or drag and drop an image
                </p>
                <p className="up-hint">Accepted format: JPG, PNG</p>
              </>
            )}
          </label>

          <input
            id="file-upload"
            className="up-file"
            type="file"
            accept="image/*"
            onChange={onChoose}
          />

          {file && (
            <button className="up-btn" type="submit" disabled={loading}>
              {loading ? "Processing..." : "UPLOAD"}
            </button>
          )}
        </form>

        {resultImage && (
          <div className="up-preview" ref={resultRef}>
            <h3>Model Heatmap Result</h3>
            <img src={resultImage} alt="Heatmap result" />
            <p className="up-result-text">
              <strong>Diagnosis:</strong> {label}
              <br />
              <strong>Confidence:</strong> {confidence?.toFixed(2)}%
            </p>
          </div>
        )}

        {error && <p className="up-error">{error}</p>}
      </main>
    </div>
  );
}
