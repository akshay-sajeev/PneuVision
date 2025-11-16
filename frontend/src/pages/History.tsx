import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/history.css";

export default function HistoryPage() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/history")
      .then((res) => res.json())
      .then((data) => setEntries(data.reverse())) // newest first
      .catch(() => setEntries([]));
  }, []);

  return (
    <div className="history-root">
      <Navbar />

      <main className="history-main">
        <h2 className="history-title">Previous Scans</h2>

        {entries.length === 0 && (
          <p className="history-empty">No scans yet.</p>
        )}

        <div className="history-grid">
          {entries.map((entry, idx) => (
            <div key={idx} className="history-card">
              <img
                src={`http://localhost:5001${entry.image_path}`}
                alt="Scan heatmap"
                className="history-img"
              />
              <p className="history-info">
                <strong>{entry.label}</strong><br />
                Confidence: {entry.confidence}%<br />
                <span className="history-date">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
