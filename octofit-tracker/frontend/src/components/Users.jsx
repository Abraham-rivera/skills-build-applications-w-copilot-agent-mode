import React, { useEffect, useState } from 'react';

function extractItems(json) {
  if (Array.isArray(json)) return json;
  if (json?.results) return json.results;
  if (json?.data) return json.data;
  // common API shape: { users: [...] }
  const arr = Object.values(json).find(v => Array.isArray(v));
  return arr || [];
}

export default function Users({ apiBase }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/users`);
        const json = await res.json();
        if (cancelled) return;
        setUsers(extractItems(json));
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true };
  }, [apiBase]);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map(u => (
          <li key={u._id || u.id} className="list-group-item">
            <strong>{u.name}</strong> — {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
