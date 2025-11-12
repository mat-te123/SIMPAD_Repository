import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// googleAuthProvider
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='307069688995-oghn2ocrlfv1kp7jg928g8ru4fcmg7nr.apps.googleusercontent.com'>
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>,
)
