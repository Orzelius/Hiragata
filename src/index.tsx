import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './style/style.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorkerRegistration.register();
