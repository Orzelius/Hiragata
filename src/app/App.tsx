import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeOld from './components/Legacy/Start/Home_Old';
import LearnOld from './components/Legacy/Learn/Learn';
import StartOld from './components/Legacy/Start/Start';
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
        <Route exact path="/o/" component={HomeOld} />
        <Route exact path="/o/Start" component={StartOld} />
        <Route exact path="/o/Learn" component={LearnOld} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
