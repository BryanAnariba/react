import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CaloriesApp from './CaloriesApp.tsx'
import { ActivityProvider } from './context/ActivityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActivityProvider>
      <CaloriesApp />
    </ActivityProvider>
  </StrictMode>,
)
