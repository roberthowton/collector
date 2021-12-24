import * as React from 'react';
import { render } from 'react-dom';
// import { BrowserRouter, Link } from 'react-router-dom';
import App from './App';

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app'),
);
