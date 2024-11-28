import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { JournalApp } from './JournalApp';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </StrictMode>,
);
