import * as React from 'react';
import { Navbar } from './components/nav/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home_Old from './components/Legacy/Start/Home_Old';
import Learn_Old from './components/Legacy/Learn/Learn';
import Start_Old from './components/Legacy/Start/Start';
import Home from './components/Home/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        {/* the Switch makes sure only the first element gets loaded */}
        <Switch>
          {/* <Route exact path="/" component={Dasboard}/> */}
          <Route exact path='/' component={Home}/>
          <Route exact path='/o/' component={Home_Old}/>
          <Route exact path='/o/Start' component={Start_Old}/>
          <Route exact path='/o/Learn' component={Learn_Old}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
