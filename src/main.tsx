import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { readDevOptions } from './lib/devOptions';
import { useGame } from './store/gameStore';
import './styles/global.css';

const { start, support } = readDevOptions();
if (start) useGame.getState().applyPreset(start);
if (support) useGame.getState().setSupport(support);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
