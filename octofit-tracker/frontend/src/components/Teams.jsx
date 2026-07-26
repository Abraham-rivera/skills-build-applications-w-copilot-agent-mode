import React, { useEffect, useState } from 'react';

function extractItems(json) {
  if (Array.isArray(json)) return json;
  if (json?.results) return json.results;
  if (json?.data) return json.data;
  const arr = Object.values(json).find(v => Array.isArray(v));
  return arr || [];
}

export default function Teams({ apiBase }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/teams`);
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

  if (loading) return <div>Loading teams...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {items.map(t => (
          <li key={t._id || t.id} className="list-group-item">
            <strong>{t.name}</strong>
            <div className="text-muted">Members: {(t.members || []).map(m => m.name || m).join(', ')}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
