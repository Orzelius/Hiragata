import * as React from 'react';
import { useHistory } from 'react-router';
import { ElementContext } from '../../ElementContext';
import getMnemonic from '../mnemonicProvider';
import MnemonicComponent from '../MnemonicComponent';
import DrawBoard from '../DrawBoard';

const Learn: React.FC = () => {
  const history = useHistory();
  const globalState = React.useContext(ElementContext);
  if (!globalState.state || !globalState.state.elements) {
    history.push('/');
    return null;
  }
  const makeQuestion = (element: number) => {
    const kana = `${globalState.state.learningHiragana ? 'Hiragana' : 'Katakana'}`;
    const kanaElement = globalState.state.elements[element];
    return (
      <span className="text-3xl text-gray-900">
        <span className="mr-2">{kana}</span>
        <span className="kanaStyle mr-2">{globalState.state.learningHiragana ? kanaElement.hiragana : kanaElement.katakana}</span>
        <span className="text-gray-800">
          (
          {kanaElement.latin}
          )
        </span>
      </span>
    );
  };
  const [state, setState] = React.useState({ number: 0, question: makeQuestion(0), mnemonic: getMnemonic(globalState.state.elements[0], globalState.state.learningHiragana) });
  const nextKana = (next: boolean) => {
    const number = state.number + (next ? 1 : -1);
    if (number === -1) return;
    if (number >= globalState.state.elements.length) {
      history.push('/Practice');
      return;
    }
    setState({ number, question: makeQuestion(number), mnemonic: getMnemonic(globalState.state.elements[number], globalState.state.learningHiragana) });
  };
  return (
    <div>
      <div className="container pt-16 px-2 sm:pt-24 sm:px-4 mb-8 flex-shrink-0">
        <h4>
          <span className="text-4xl text-gray-600 font-light inline-block mr-2">
            {`${state.number + 1}/${globalState.state.elements.length}`}
          </span>
          {state.question}
        </h4>
        <div className="text-center mt-2">
          <button
            onClick={() => nextKana(false)}
            type="submit"
            className="py-1 mb-1 px-4 text-xl border border-gray-500 rounded inline-block hover:bg-gray-200 w-40"
          >
            &lt; Back
          </button>
          <div className="w-1/3 inline-block" />
          <button
            onClick={() => nextKana(true)}
            type="button"
            className="py-1 px-4 text-xl border border-gray-500 rounded inline-block hover:bg-gray-200 w-40"
          >
            {state.number === globalState.state.elements.length - 1 ? 'Practice' : 'Next >'}
          </button>
        </div>
        <div className="lg:flex mt-4 sm:mt-12 max-w-md lg:max-w-6xl">
          <div className="w-full lg:w-1/2">
            <h3 className="font-thin">Mnemonic: </h3>
            <MnemonicComponent mnemonic={state.mnemonic} showImage />
          </div>
          <div className="w-full lg:w-1/2 lg:px-8">
            <h3 className="font-thin">Try to draw it: </h3>
            <DrawBoard character="あ" />
          </div>
        </div>
        {/* <img src={`assets/${globalState.state.learningHiragana ? 'hiragana' : 'katakana'}/${wanakana.toRomaji(state.mnemonic.letter)}.jpg`} alt="" /> */}
      </div>
    </div>
  );
};

export default Learn;