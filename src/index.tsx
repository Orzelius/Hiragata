import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './style/style.css';

const startApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
  serviceWorkerRegistration.register();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((window as any).cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}
