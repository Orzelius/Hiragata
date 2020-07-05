import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/nav/Navbar';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      {/* the Switch makes sure only the first element gets loaded */}
      <Switch>
        {/* <Route exact path="/" component={Dasboard}/> */}
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
