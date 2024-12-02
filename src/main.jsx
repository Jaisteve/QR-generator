import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QRcoder } from './component/QRcoder.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <QRcoder/>
  </StrictMode>,
)
