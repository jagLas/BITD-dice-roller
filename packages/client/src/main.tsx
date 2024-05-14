import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HistoryProvider } from './utils/HistoryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </React.StrictMode>,
)
