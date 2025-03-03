import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CryptoQuoterApp from './CryptoQuoterApp.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CryptoQuoterApp />
  </StrictMode>,
)
