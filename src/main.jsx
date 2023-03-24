import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import { TallerApp } from './TallerApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <TallerApp />
    </BrowserRouter>
 
)
