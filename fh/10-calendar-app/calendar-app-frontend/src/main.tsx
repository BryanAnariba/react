import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CalendarApp } from './CalendarApp';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarApp />
  </StrictMode>
)
