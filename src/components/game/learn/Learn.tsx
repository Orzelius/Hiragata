import * as React from 'react';
import { useHistory } from 'react-router';
import { ElementContext } from '../../ElementContext';
import getMnemonic from '../mnemonicProvider';
import MnemonicComponent from '../MnemonicComponent';
import DrawBoard from '../DrawBoard';
import useWindowDimensions from '../../useWindowDimensions';

const Learn: React.FC = () => {
  const history = useHistory();
  const globalState = React.useContext(ElementContext);
  if (!globalState.gState || !globalState.gState.selectedElements) {
    history.push('/');
    return null;
  }

  const makeQuestion = (element: number) => {
    const kana = `${globalState.gState.learningHiragana ? 'Hiragana' : 'Katakana'}`;
    const kanaElement = globalState.gState.selectedElements[element];
    return (
      <span className="text-3xl text-gray-900">
        <span className="mr-2">{kana}</span>
        <span className="kanaStyle mr-2">{globalState.gState.learningHiragana ? kanaElement.hiragana : kanaElement.katakana}</span>
        <span className="text-gray-800">
          (
          {kanaElement.latin}
          )
        </span>
      </span>
    );
  };

  const [state, setState] = React.useState({
    number: 0,
    question: makeQuestion(0),
    mnemonic: getMnemonic(globalState.gState.selectedElements[0], globalState.gState.learningHiragana),
    showKana: true,
  });

  const nextKana = (next: boolean) => {
    const number = state.number + (next ? 1 : -1);
    if (number === -1) return;
    if (number >= globalState.gState.selectedElements.length) {
      history.push('/Practice');
      return;
    }
    setState({
      number, question: makeQuestion(number), mnemonic: getMnemonic(globalState.gState.selectedElements[number], globalState.gState.learningHiragana), showKana: true,
    });
  };

  const charShowClicked = () => {
    setState({ ...state, showKana: !state.showKana });
  };

  const screenWidth = useWindowDimensions().width;
  const drawBoardWidth = screenWidth < 520 ? screenWidth - 30 : 500;

  return (
    <div>
      <h4>
        <span className="text-4xl text-gray-600 font-light inline-block mr-2">
          {`${state.number + 1}/${globalState.gState.selectedElements.length}`}
        </span>
        {state.question}
      </h4>
      <div className="text-center sm:text-left mt-2">
        <button
          onClick={() => nextKana(false)}
          type="submit"
          className="py-1 mb-1 px-4 text-xl border border-gray-500 rounded inline-block hover:bg-gray-200 w-1/2 sm:w-40"
        >
          &lt; Back
        </button>
        <button
          onClick={() => nextKana(true)}
          type="button"
          className="py-1 px-4 text-xl border border-gray-500 rounded inline-block hover:bg-gray-200 w-1/2 sm:w-40 float-right"
        >
          {state.number === globalState.gState.selectedElements.length - 1 ? 'Practice' : 'Next >'}
        </button>
      </div>
      <div className="container lg:flex mt-4 sm:mt-12 w-min lg:w-full md:mx-auto">
        <div className="lg:w-2/5">
          <h3 className="font-thin">Mnemonic: </h3>
          <MnemonicComponent mnemonic={state.mnemonic} showImage />
        </div>
        <div className="lg:w-3/5">
          <div className="lg:float-right">
            <h3 className="font-thin">Try to draw it: </h3>
            <DrawBoard key={state.mnemonic.kana} character={state.mnemonic.kana} onCharacterShow={charShowClicked} showCharacter={state.showKana} onDrawn={() => undefined} size={drawBoardWidth} />
          </div>
        </div>
      </div>
      {/* <img src={`assets/${globalState.state.learningHiragana ? 'hiragana' : 'katakana'}/${wanakana.toRomaji(state.mnemonic.letter)}.jpg`} alt="" /> */}
    </div>
  );
};

export default Learn;