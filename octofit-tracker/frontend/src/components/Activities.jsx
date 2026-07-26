import React, { useEffect, useState } from 'react';

function extractItems(json) {
  if (Array.isArray(json)) return json;
  if (json?.results) return json.results;
  if (json?.data) return json.data;
  const arr = Object.values(json).find(v => Array.isArray(v));
  return arr || [];
}

export default function Activities({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/activities`);
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

  if (loading) return <div>Loading activities...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map(a => (
          <li key={a._id || a.id} className="list-group-item">
            <div><strong>{a.type}</strong> — {a.durationMinutes} minutes</div>
            <div className="text-muted">Calories: {a.calories}</div>
            <div className="text-muted">User: {a.user?.name || a.user}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
