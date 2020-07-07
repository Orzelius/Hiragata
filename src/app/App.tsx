import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/nav/Navbar';
import { ElementContext, State } from './components/ElementContext';
import Learn from './components/game/learn/Learn';

const initState: State = {
  elements: null,
  learningHiragana: true,
};
const App: React.FC = () => {
  const [state, setState] = React.useState(initState);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* the Switch makes sure only the first element gets loaded */}
        <Switch>
          {/* <Route exact path="/" component={Dasboard}/> */}
          <ElementContext.Provider value={{ state, setState }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/learn" component={Learn} />
          </ElementContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
