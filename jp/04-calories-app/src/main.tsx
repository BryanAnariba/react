import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CaloriesApp from './CaloriesApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CaloriesApp />
  </StrictMode>,
)
