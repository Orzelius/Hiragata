import * as React from 'react';
import { useHistory } from 'react-router';
import { ElementContext } from '../../ElementContext';
import getMnemonic from '../mnemonicProvider';
import MnemonicComponent from '../MnemonicComponent';
import DrawBoard from '../DrawBoard';

export interface HistoryElement {
  number: number;
  correct: boolean;
}
const Practice: React.FC = () => {
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
        <span className="mr-2">{`Draw the ${kana} for `}</span>
        <span className="text-gray-800 text-4xl bg-blue-200 rounded-md">
          {kanaElement.latin}
        </span>
      </span>
    );
  };

  const initHistory: HistoryElement[] = [];
  // State for the entire pracice session
  const [totalState, setTotalState] = React.useState({
    history: initHistory,
    number: 0,
  });

  // State for current kana
  const [roundState, setRoundState] = React.useState({
    // 0 - drawing, 1 - correct, 2 - incorrect, 3 - self-evaluation
    question: makeQuestion(0),
    mnemonic: getMnemonic(globalState.state.elements[0], globalState.state.learningHiragana),
    status: 0,
    showMnemonic: false,
    showCharacter: false,
  });

  const nextKana = (correct: boolean) => {
    let number = totalState.number;
    if (globalState.state.elements.length === 1) number = 0;
    else if (globalState.state.elements.length === 2) number = number === (globalState.state.elements.length - 1) ? 0 : 1;
    else {
      while (number === totalState.number || (totalState.history.length && number === totalState.history[totalState.history.length - 1].number)) {
        number = Math.round(Math.random() * (globalState.state.elements.length - 1));
      }
    }
    setTotalState({
      history: [...totalState.history, { number, correct }],
      number,
    });
    setRoundState({
      question: makeQuestion(number),
      mnemonic: getMnemonic(globalState.state.elements[number], globalState.state.learningHiragana),
      status: 0,
      showMnemonic: false,
      showCharacter: false,
    });
  };

  const checkAnswer = () => {
    // Fancy AI here in the future
    setRoundState({
      ...roundState,
      showMnemonic: true,
      status: 3,
    });
  };

  const mnemonicClicked = () => {
    const newRoundState = { ...roundState };
    newRoundState.status = roundState.status === 1 ? 1 : 2;
    // newRoundState.status = 0;
    newRoundState.showMnemonic = !newRoundState.showMnemonic;
    setRoundState(newRoundState);
  };

  const onCharacterShow = () => {
    const newRoundState = { ...roundState };
    newRoundState.status = roundState.status === 1 ? 1 : 2;
    newRoundState.showCharacter = !newRoundState.showCharacter;
    // newRoundState.status = 0;
    setRoundState(newRoundState);
  };

  const btn = {
    buttonStyle: 'hover:bg-gray-200',
    buttonText: 'Check',
  };

  if (roundState.status === 1) {
    btn.buttonText = 'Next';
    btn.buttonStyle = 'bg-green-200 hover:bg-green-300';
  } else if (roundState.status === 2) {
    btn.buttonText = 'Next';
    btn.buttonStyle = 'bg-red-200 hover:bg-red-300';
  } else if (roundState.status === 3) {
    btn.buttonText = 'I Got it right';
    btn.buttonStyle = 'bg-green-200 hover:bg-green-300';
  }

  const evalButtonClicked = () => {
    // eslint-disable-next-line default-case
    switch (roundState.status) {
      case 0:
        checkAnswer();
        break;
      case 1:
        nextKana(true);
        break;
      case 2:
        nextKana(false);
        break;
      case 3:
        nextKana(true);
        break;
    }
  };

  const finishPractice = () => {
    history.push({
      pathname: '/results',
      state: totalState.history,
    });
  };

  return (
    <div>
      <div className="container pt-16 px-2 sm:pt-24 sm:px-4 mb-8 flex-shrink-0">
        <h4>
          <span className="text-4xl text-gray-600 font-light inline-block mr-2">
            {totalState.history.length}
          </span>
          {roundState.question}
          <div className="mt-4 float-right">
            <div>
              <button
                // onClick={roundState.status === 1 ? nextKana : checkAnswer}
                onClick={evalButtonClicked}
                type="submit"
                className={`float-right py-1 px-4 text-xl border border-gray-500 rounded w-40 ${btn.buttonStyle}`}
              >
                {btn.buttonText}
              </button>
              <button
                // onClick={roundState.status === 1 ? nextKana : checkAnswer}
                hidden={roundState.status !== 3}
                onClick={() => nextKana(false)}
                type="submit"
                className="float-right py-1 px-4 text-xl border border-gray-500 rounded w-40 bg-red-200 hover:bg-red-300 mr-2"
              >
                I got it wrong
              </button>
            </div>
            {/* <span className="text text-sm text-red-700 hover:underline cursor-pointer" hidden={roundState.status !== 2}>Report incorrect recognition</span> */}
          </div>
        </h4>
        <div className="lg:flex mt-4 sm:mt-12 max-w-md lg:max-w-6xl">
          <div className="w-full lg:w-1/2">
            <button onClick={mnemonicClicked} type="button" className="text-left border-b w-full border-gray-600 cursor-pointer">
              <h3 className="inline-block">Mnemonic:</h3>
              <span className="float-right mt-4 mr-2 text-xl border px-3 border-gray-600 rounded hover:bg-gray-200">{roundState.showMnemonic ? '⋀' : '⋁'}</span>
            </button>
            <div className="mt-4 text-center items-center" hidden={!roundState.showMnemonic}>
              <MnemonicComponent mnemonic={roundState.mnemonic} showImage />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:px-8">
            <h3 className="font-thin">Try to draw it: </h3>
            <DrawBoard key={roundState.mnemonic.kana} character={roundState.mnemonic.kana} onCharacterShow={onCharacterShow} showCharacter={roundState.showCharacter} />
            {/* {drawBoard} */}
          </div>
        </div>
        <div className="pt-4 mt-6 text-center border-t">
          <button
            // onClick={roundState.status === 1 ? nextKana : checkAnswer}
            onClick={finishPractice}
            type="submit"
            className="py-1 px-4 text-xl border border-gray-500 rounded w-40 hover:bg-blue-200 hover:border-blue-900"
          >
            Finish practice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Practice;