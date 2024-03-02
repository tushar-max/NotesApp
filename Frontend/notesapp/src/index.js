import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="106212202874-fdisd4shgutnd3pjnch6epoi4l9b2pok.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  // </React.StrictMode>
);

reportWebVitals();
