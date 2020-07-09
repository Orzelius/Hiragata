import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/nav/Navbar';
import { ElementContext, State } from './components/ElementContext';
import Learn from './components/game/learn/Learn';
import Practice from './components/game/practice/practice';

const initState: State = {
  // for more convenient testing
  elements: [
    { hiragana: 'や', katakana: 'ヤ', latin: 'ya' },
    { hiragana: 'ゆ', katakana: 'ユ', latin: 'yu' },
    { hiragana: 'よ', katakana: 'ヨ', latin: 'yo' },
    { hiragana: 'ら', katakana: 'ラ', latin: 'ra' },
    { hiragana: 'り', katakana: 'リ', latin: 'ri' },
    { hiragana: 'る', katakana: 'ル', latin: 'ru' },
    { hiragana: 'れ', katakana: 'レ', latin: 're' },
    { hiragana: 'ろ', katakana: 'ロ', latin: 'ro' },
  ],
  // elements: null,
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
            <Route exact path="/practice" component={Practice} />
          </ElementContext.Provider>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
