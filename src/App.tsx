import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Select from './components/Home/Select/Select';
import Navbar from './components/nav/Navbar';
import { ElementContext, initConext } from './components/ElementContext';
import Practice from './components/game/practice/Practice';
import Results from './components/game/results/Results';
import { Container } from './Helpers/BasicComponents';
import { KanaElement } from './components/Home/Select/KanaTable/KanaTable';
import Home from './components/Home/Home';

const initState = { ...initConext.gState };

if (process.env.NODE_ENV === 'development') {
  const preselectedEl: KanaElement[] = [
    { hiragana: 'や', katakana: 'ヤ', latin: 'ya' },
    { hiragana: 'ゆ', katakana: 'ユ', latin: 'yu' },
    { hiragana: 'よ', katakana: 'ヨ', latin: 'yo' },
    { hiragana: 'ら', katakana: 'ラ', latin: 'ra' },
    { hiragana: 'り', katakana: 'リ', latin: 'ri' },
    { hiragana: 'る', katakana: 'ル', latin: 'ru' },
    { hiragana: 'れ', katakana: 'レ', latin: 're' },
    { hiragana: 'ろ', katakana: 'ロ', latin: 'ro' },
  ];
  initState.selectedElements = preselectedEl;
  initState.progress = {
    elements: preselectedEl.map(el => ({
      status: 'notLearnt',
      element: el,
      guesses: [],
      urgency: 6,
    })),
    total: 0,
  };
}

const App: React.FC = () => {
  const [gState, setGState] = React.useState(initState);
  document.title = 'Hiragata';
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* the Switch makes sure only the first element gets loaded */}
        <Switch>
          {/* <Route exact path="/" component={Dasboard}/> */}
          <Container className="pt-10">
            <ElementContext.Provider value={{ gState, setGState }}>
              <Route exact path="/" component={Home} />
              <Route exact path="/select" component={Select} />
              <Route exact path="/practice" component={Practice} />
              <Route exact path="/results" component={Results} />
            </ElementContext.Provider>
          </Container>
        </Switch>
      </div>
      <h4 className="StrokeOrderFont text-white" style={{ fontSize: '00.1rem' }}>ア</h4>
    </BrowserRouter>
  );
};

export default App;
