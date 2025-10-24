import { useEffect, useRef, useState } from "react";
import "../styles/pages/upload.css";






export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);     

  const pickFile = (f: File | null) => {
    if (!f) {
      setFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      alert("Please upload an image file (JPG/PNG).");
      return;
    }
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    pickFile(e.target.files?.[0] ?? null);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0] ?? null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    // TODO: send `file` to backend
    alert(`Ready to submit: ${file.name}`);
  };

  const onClear = () => {
    if (inputRef.current) inputRef.current.value = "";
    pickFile(null);
  };


  return (
    <div className="upload-page">
      <form className="upload-form" onSubmit={onSubmit}>
        <h2 className="upload-heading">Upload Scan</h2>

        <label
          htmlFor="xray"
          className={`upload-panel ${dragging ? "dragging" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          tabIndex={0}
        >
          <div className="panel-content">
            <span className="panel-title">Drag & drop an X-ray</span>
            <span className="panel-sub">or click to browse</span>
          </div>
          <input
            id="xray"
            ref={inputRef}
            type="file"
            accept="image/*"
            className="file-input"
            onChange={onChange}
          />
        </label>

        <div className="actions">
          <button type="submit" className="btn primary" disabled={!file}>
            Submit
          </button>
          <button type="button" className="btn ghost" onClick={onClear} disabled={!file}>
            Clear
          </button>
        </div>

        {/* Centered preview */}
        {previewUrl && (
          <div className="preview-wrap">
            <img src={previewUrl} alt="Selected X-ray" className="preview-img" />
            <div className="preview-meta">
              <span>{file?.name}</span>
              {file && <span> · {(file.size / 1024 / 1024).toFixed(2)} MB</span>}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
