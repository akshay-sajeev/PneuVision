import { useState, useRef, useEffect } from "react";
import "../styles/compare.css";

export default function Compare() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);

  const [results, setResults] = useState<any>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [results]);

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
        body: formData,
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
        <div
          className="compare-box"
          onClick={() => document.getElementById("file1")?.click()}
        >
          <h3>Scan 1</h3>

          {!preview1 ? (
            <div className="upload-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 24 24"
                stroke="#7b4ff3"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: "8px" }}
              >
                <path d="M12 16V4" />
                <path d="M6 10l6-6 6 6" />
                <path d="M20 18H4" />
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

        <div
          className="compare-box"
          onClick={() => document.getElementById("file2")?.click()}
        >
          <h3>Scan 2</h3>

          {!preview2 ? (
            <div className="upload-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 24 24"
                stroke="#7b4ff3"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: "8px" }}
              >
                <path d="M12 16V4" />
                <path d="M6 10l6-6 6 6" />
                <path d="M20 18H4" />
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

      <button className="compare-btn" onClick={handleCompare}>
        Compare Scans
      </button>

      {results && (
        <div className="compare-results" ref={resultsRef}>
          <div className="compare-col">
            <h3>Scan 1 Result</h3>
            <p>
              <strong>{results.scan1.label}</strong>
            </p>
            <p>Confidence: {results.scan1.confidence}%</p>

            <img
              className="compare-img"
              src={`http://localhost:5001${results.scan1.image_path}`}
              alt="Scan 1 Heatmap"
            />
          </div>

          <div className="compare-col">
            <h3>Scan 2 Result</h3>
            <p>
              <strong>{results.scan2.label}</strong>
            </p>
            <p>Confidence: {results.scan2.confidence}%</p>

            <img
              className="compare-img"
              src={`http://localhost:5001${results.scan2.image_path}`}
              alt="Scan 2 Heatmap"
            />
          </div>
        </div>
      )}
    </div>
  );
}
