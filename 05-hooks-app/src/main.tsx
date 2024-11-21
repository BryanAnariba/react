import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { MainApp } from './09-useContext/MainApp';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}>
      {/* <HooksApp /> */}
      <MainApp />
    </BrowserRouter>
  </StrictMode>,
)
