import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ---------

import { FirebaseAppProvider } from 'reactfire';
import config from './SaaS/Database/firebaseConfig';



ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={config}>
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  </FirebaseAppProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
