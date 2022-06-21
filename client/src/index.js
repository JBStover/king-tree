import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  store  from './store';
import { Provider } from 'react-redux';
import  fetchCharacter  from './slices/characterSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

//store.dispatch(fetchMember());

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);


reportWebVitals();