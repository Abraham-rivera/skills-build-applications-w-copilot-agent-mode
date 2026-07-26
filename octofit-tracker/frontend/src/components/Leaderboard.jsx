import React, { useEffect, useState } from 'react';

function extractItems(json) {
  if (Array.isArray(json)) return json;
  if (json?.results) return json.results;
  if (json?.data) return json.data;
  const arr = Object.values(json).find(v => Array.isArray(v));
  return arr || [];
}

export default function Leaderboard({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/leaderboard`);
        const json = await res.json();
        if (cancelled) return;
        setItems(extractItems(json));
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true };
  }, [apiBase]);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {items.map(lb => (
          <li key={lb._id || lb.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">{lb.user?.name || lb.user}</div>
              <div className="text-muted">Score: {lb.score}</div>
            </div>
            <span className="badge bg-primary rounded-pill">{lb.rank || '-'}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
