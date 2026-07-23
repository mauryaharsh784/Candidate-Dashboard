import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CandidateProvider } from './context/CandidateContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CandidateProvider>
      <App />
    </CandidateProvider>
  </React.StrictMode>,
)
