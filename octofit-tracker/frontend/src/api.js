// Compute API base URL using Vite env VITE_CODESPACE_NAME with safe fallback to localhost
export const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export default apiBase;
