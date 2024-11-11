import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
