import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './app/store';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isGitHubPages =
  process.env.NODE_ENV === 'production' && process.env.PUBLIC_URL;

const basename = isGitHubPages ? '/studiopresto-shop' : '/';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();
