// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify'; // <-- 1. IMPORT
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; // <-- 2. IMPORT CSS

// Your existing CSS imports
import './index.css'; 
import './assets/css/main.css'; 
import './assets/css/animations.css'; 
import './assets/css/layout.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer 
      autoClose={3000} 
      position="bottom-right" 
      theme="colored"
    /> {/* <-- 3. ADD CONTAINER */}
  </React.StrictMode>,
);