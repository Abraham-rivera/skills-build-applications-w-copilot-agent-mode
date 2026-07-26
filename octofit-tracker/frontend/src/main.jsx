import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { apiBase } from './api';

console.log('Using API base:', apiBase);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App apiBase={apiBase} />
    </BrowserRouter>
  </React.StrictMode>,
);
