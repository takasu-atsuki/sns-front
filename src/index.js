import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { store } from './app/store';
import { CookiesProvider } from 'react-cookie';
import App from './App';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
