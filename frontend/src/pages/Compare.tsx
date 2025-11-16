import { useState } from "react";
import "../styles/compare.css";

export default function Compare() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);

  const [results, setResults] = useState<any>(null);

  function chooseFile1(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile1(f);
    if (f) setPreview1(URL.createObjectURL(f));
  }

  function chooseFile2(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile2(f);
    if (f) setPreview2(URL.createObjectURL(f));
  }

  async function handleCompare() {
    if (!file1 || !file2) return;

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      const response = await fetch("http://localhost:5001/compare", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="compare-root">
      <h1 className="compare-title">Compare Scans</h1>

      <div className="compare-inputs">
        
        {/* ======= Scan 1 Box ======= */}
        <div
          className="compare-box"
          onClick={() => document.getElementById("file1")?.click()}
        >
          <h3>Scan 1</h3>

          {!preview1 ? (
            <div className="upload-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#7b4ff3">
                <path
                  d="M12 16v-8m0 0l-4 4m4-4l4 4M6 20h12a2 2 0 002-2v-3a2 2 0 00-2-2h-1"
                  stroke="#7b4ff3"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <p>Click to upload</p>
            </div>
          ) : (
            <img src={preview1} className="compare-img" alt="Scan 1" />
          )}

          <input
            id="file1"
            type="file"
            accept="image/*"
            onChange={chooseFile1}
            style={{ display: "none" }}
          />
        </div>

        {/* ======= Scan 2 Box ======= */}
        <div
          className="compare-box"
          onClick={() => document.getElementById("file2")?.click()}
        >
          <h3>Scan 2</h3>

          {!preview2 ? (
            <div className="upload-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#7b4ff3">
                <path
                  d="M12 16v-8m0 0l-4 4m4-4l4 4M6 20h12a2 2 0 002-2v-3a2 2 0 00-2-2h-1"
                  stroke="#7b4ff3"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <p>Click to upload</p>
            </div>
          ) : (
            <img src={preview2} className="compare-img" alt="Scan 2" />
          )}

          <input
            id="file2"
            type="file"
            accept="image/*"
            onChange={chooseFile2}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {/* ======= Compare Button ======= */}
      <button className="compare-btn" onClick={handleCompare}>
        Compare Scans
      </button>

      {/* ======= Results Section ======= */}
      {results && (
        <div className="compare-results">
          <div className="compare-col">
            <h3>Scan 1 Result</h3>
            <p><strong>{results.label1}</strong></p>
            <p>Confidence: {results.confidence1}%</p>
            <img className="compare-img" src={results.heatmap1} />
          </div>

          <div className="compare-col">
            <h3>Scan 2 Result</h3>
            <p><strong>{results.label2}</strong></p>
            <p>Confidence: {results.confidence2}%</p>
            <img className="compare-img" src={results.heatmap2} />
          </div>
        </div>
      )}
    </div>
  );
}
