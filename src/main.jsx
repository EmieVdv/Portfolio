import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReactLenis root options={{ duration: 1.6, smoothWheel: true }}>
        <App />
      </ReactLenis>
    </BrowserRouter>
  </StrictMode>,
)
