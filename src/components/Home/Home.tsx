import * as React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { buildElements } from '../../Helpers/Helpers';
import { ElementContext, Progress } from '../ElementContext';
import useWindowDimensions from '../useWindowDimensions';
import { KanaElement } from './Select/KanaTable/KanaTable';

export const createGstateProgress = (elements: KanaElement[]): Progress => {
  const newGstateProcess: Progress = { elements: [], total: 0 };
  elements.forEach(el => newGstateProcess.elements.push({
    element: el, guesses: [], urgency: 0, status: 'notLearnt',
  }));
  return newGstateProcess;
};

const Home: React.FC = () => {
  const history = useHistory();
  const { gState, setGState } = React.useContext(ElementContext);

  const onChooseKana = () => {
    setGState({ ...gState, learningHiragana: !gState.learningHiragana });
  };

  const onStart = () => {
    const elements = buildElements();
    setGState({
      ...gState,
      selectedElements: elements,
      progress: createGstateProgress(elements),
    });
    history.push('/Practice');
  };

  const dimensions = useWindowDimensions();

  return (
    <>
      <div className="content-center text-center" style={{ marginTop: dimensions.height > 700 ? dimensions.height / 2 - 250 + 'px' : '10px' }}>
        <div className="h-44">
          <h1 className="text-5xl mb-3">
            I want to learn
          </h1>
          <div className="cursor-pointer" onClick={onChooseKana}>
            <button className="text-5xl font-bold" type="button">
              <span>
                <span className={`${gState.learningHiragana && 'underline text-green-800'}`}>Hiragana</span>
                <span className="px-2">/</span>
                <span className={`${!gState.learningHiragana && 'underline text-green-800'}`}>Katakana</span>
              </span>
            </button>
          </div>
          {!gState.learningHiragana && (<p className="text-base pt-2">It&apos;s recommended to learn Hiragana first</p>)}
        </div>
        <button
          type="button"
          onClick={onStart}
          className="w-5/12 sm:w-56 border-2 rounded py-3 text-center text-lg font-bold m-1 border-green-500 bg-green-100 text-green-900 hover:bg-green-200"
        >
          Start
        </button>
        <div />
        <Link to="/select" className="underline">Or choose custom characters</Link>
      </div>
    </>
  );
};

export default Home;
