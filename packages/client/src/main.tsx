import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HistoryProvider } from './utils/HistoryContext.tsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
// import { ErrorElement } from './ErrorElement.tsx'

const router = createBrowserRouter([
  {
    path: '/room/:roomId',
    element:
      <HistoryProvider>
        <App />
      </HistoryProvider>
  },
    {
      path: '/',
      element: 
        <HistoryProvider>
          <App />
        </HistoryProvider>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
