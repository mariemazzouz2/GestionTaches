import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css'; // ou App.css selon ton cas
import { Provider } from 'react-redux';
import { store } from './app/store.js';
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-ENjdO4Dr2bkBIFxQpeoQXTxE06V9L8Jooxjnq4MqC64Piw5MZ6Kp4YfRvH+8abtT"
  crossorigin="anonymous"
/>


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
