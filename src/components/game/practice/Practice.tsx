import * as React from 'react';
import { useHistory } from 'react-router';
import ProgressBar from '@ramonak/react-progress-bar';
import { ElementContext, GState } from '../../ElementContext';
import getMnemonic from '../mnemonicProvider';
import MnemonicComponent from '../MnemonicComponent';
import DrawBoard from '../DrawBoard';
import useWindowDimensions from '../../useWindowDimensions';
import Evaluator from '../logic/Evaluator';
import EvaluatorDebug from '../../../Helpers/debug';
import Learn from '../learn/Learn';
import { KanaElement } from '../../Home/KanaTable/KanaTable';
import NextKana from './NextKana';

enum RoundStatus {
  DRAWING,
  CORRECT,
  INCORRECT,
  SELF_EVAL,
  HAS_NOT_DRAWN,
  LEARNING,
  TO_LEARNING,
}

const Practice: React.FC = () => {
  const screenWidth = useWindowDimensions().width;
  const history = useHistory();
  const { gState, setGState } = React.useContext(ElementContext);
  const evaluator = new Evaluator({
    selectedEl: gState.selectedElements,
    penalty: { green: 5, red: 2 },
    reward: 1,
    urgencyHigherLimit: 10,
    memoryRefresher: gState.progress.elements.filter(el => el.status === 'green').length + 5,
    maxUrgency: 20,
    maxStreak: { negative: 10, positive: 4 },
  });
  if (!gState || !gState.selectedElements || gState.selectedElements.length === 0) {
    history.push('/');
    return (null);
  }

  const [learnState, setLearnState] = React.useState(evaluator.chooseLearn(gState.progress));

  const makeQuestion = (element: KanaElement) => {
    const kana = `${gState.learningHiragana ? 'Hiragana' : 'Katakana'}`;
    return (
      <span className="text-3xl text-gray-900">
        <span className="mr-2">{`Draw the ${kana} for `}</span>
        <span className="text-gray-800 text-4xl bg-blue-200 rounded-md">
          {element.latin}
        </span>
      </span>
    );
  };

  // State for current kana
  const [roundState, setRoundState] = React.useState({
    // 0 - drawing, 1 - correct, 2 - incorrect, 3 - self-evaluation, 4 - hasNotDrawn
    element: gState.selectedElements[0],
    question: makeQuestion(gState.selectedElements[0]),
    mnemonic: getMnemonic(gState.selectedElements[0], gState.learningHiragana),
    status: RoundStatus.LEARNING,
    showMnemonic: false,
    showCharacter: false,
  });

  const nextStep = (curStep: { action: 'learnt' } | { action: 'guessed', correct: boolean }) => {
    const progressElI = gState.progress.elements.findIndex(e => e.element === roundState.element);
    const newGstate: GState = ({ ...gState });

    if (curStep.action === 'guessed') {
      newGstate.progress.elements[progressElI].guesses.unshift({ correct: curStep.correct, time: Date.now() });
      newGstate.progress.total++;
      newGstate.progress = evaluator.calculateUrgency({ el: roundState.element, correct: curStep.correct }, newGstate.progress);
    } else {
      newGstate.progress.elements[progressElI].status = 'fresh';
      newGstate.progress.elements[progressElI].urgency = 15;
    }

    let nextEl: KanaElement;
    let newStatus: RoundStatus;

    const learn = evaluator.chooseLearn(newGstate.progress);
    if (learn !== 'nothing to learn' && learn.mustBeLearnt) {
      nextEl = learn.element;
      newStatus = RoundStatus.LEARNING;
    } else if (learn !== 'nothing to learn' && learn.canBeLearnt) {
      nextEl = learn.element;
      newStatus = RoundStatus.TO_LEARNING;
    } else {
      nextEl = evaluator.chooseNextKana(roundState.element, newGstate.progress);
      newStatus = RoundStatus.HAS_NOT_DRAWN;
    }

    setLearnState(learn);
    setGState(newGstate);
    setRoundState({
      element: nextEl,
      question: makeQuestion(nextEl),
      mnemonic: getMnemonic(nextEl, gState.learningHiragana),
      status: newStatus,
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
    if (roundState.status === RoundStatus.DRAWING || roundState.status === RoundStatus.HAS_NOT_DRAWN) newRoundState.status = RoundStatus.INCORRECT;
    newRoundState.showMnemonic = !newRoundState.showMnemonic;
    setRoundState(newRoundState);
  };

  const onCharacterShow = () => {
    const newRoundState = { ...roundState };
    if (roundState.status === RoundStatus.DRAWING || roundState.status === RoundStatus.HAS_NOT_DRAWN) newRoundState.status = RoundStatus.INCORRECT;
    newRoundState.showCharacter = !newRoundState.showCharacter;
    setRoundState(newRoundState);
  };

  const onUserHasDrawn = () => {
    setRoundState(state => {
      const newRoundState = { ...state };
      if (newRoundState.status === RoundStatus.HAS_NOT_DRAWN) newRoundState.status = RoundStatus.DRAWING;
      return newRoundState;
    });
  };

  const onToLearn = () => {
    setLearnState(evaluator.chooseLearn(gState.progress));
    setRoundState({ ...roundState, status: RoundStatus.LEARNING });
  };

  const onCancelLearn = () => {
    const newGstateElements = gState.progress.elements.map(el => {
      let newEl = el;
      if (el.status === 'green') newEl = evaluator.changeUrgency(newEl, 7);
      else if (el.status === 'urgent') newEl = evaluator.changeUrgency(newEl, newEl.urgency * 1.5);
      return newEl;
    });
    const newGState = { ...gState };
    newGState.progress.elements = newGstateElements;
    const nextEl = evaluator.chooseNextKana(roundState.element, newGState.progress);
    console.log(newGState.progress);

    setLearnState(evaluator.chooseLearn(newGState.progress));
    setRoundState({
      element: nextEl,
      question: makeQuestion(nextEl),
      mnemonic: getMnemonic(nextEl, gState.learningHiragana),
      status: RoundStatus.HAS_NOT_DRAWN,
      showMnemonic: false,
      showCharacter: false,
    });
  };

  const btn = {
    buttonStyle: 'hover:bg-gray-200',
    buttonText: 'Check',
  };

  if (roundState.status === RoundStatus.CORRECT) {
    btn.buttonText = 'Next';
    btn.buttonStyle = 'bg-green-200 hover:bg-green-300';
  } else if (roundState.status === RoundStatus.HAS_NOT_DRAWN) {
    btn.buttonText = 'Give up';
    btn.buttonStyle = 'bg-red-200 hover:bg-red-300';
  } else if (roundState.status === RoundStatus.INCORRECT) {
    btn.buttonText = 'Next';
    btn.buttonStyle = 'bg-red-200 hover:bg-red-300';
  } else if (roundState.status === RoundStatus.SELF_EVAL) {
    btn.buttonText = 'I Got it right';
    btn.buttonStyle = 'bg-green-200 hover:bg-green-300';
  }

  const evalButtonClicked = () => {
    // eslint-disable-next-line default-case
    switch (roundState.status) {
      case RoundStatus.DRAWING:
        checkAnswer();
        break;
      case RoundStatus.CORRECT:
        nextStep({ action: 'guessed', correct: true });
        break;
      case RoundStatus.INCORRECT:
        nextStep({ action: 'guessed', correct: false });
        break;
      case RoundStatus.SELF_EVAL:
        nextStep({ action: 'guessed', correct: true });
        break;
      case RoundStatus.HAS_NOT_DRAWN:
        nextStep({ action: 'guessed', correct: false });
        break;
      case RoundStatus.TO_LEARNING:
        nextStep({ action: 'guessed', correct: true });
        break;
    }
  };

  const finishPractice = () => {
    history.push({
      pathname: '/results',
    });
  };

  const drawBoardWidth = screenWidth < 520 ? screenWidth - 30 : 500;
  if (roundState.status === RoundStatus.LEARNING) {
    return (
      <Learn element={roundState.element} onNextBtnClick={() => nextStep({ action: 'learnt' })} />
    );
  }
  return (
    <>
      <EvaluatorDebug evaluator={evaluator} />
      <div className="lg:mt-5">
        <ProgressBar completed={learnState !== 'nothing to learn' ? learnState.percent : 0} isLabelVisible={false} height="5px" />
        {roundState.status === RoundStatus.TO_LEARNING ? <NextKana kana={roundState.element} onCancel={onCancelLearn} onNext={onToLearn} /> : (
          <>
            <div className="mt-2">
              <h4 className="mr-3 inline-block">
                <span className="text-4xl text-gray-600 font-light inline-block mr-2">
                  {gState.progress.total}
                </span>
                {roundState.question}
              </h4>
              <div className="mt-4 float-right">
                <div>
                  <button
                    onClick={evalButtonClicked}
                    type="submit"
                    className={`float-right py-1 px-4 text-xl border border-gray-500 rounded h-11 w-40 ${btn.buttonStyle}`}
                  >
                    {btn.buttonText}
                  </button>
                  <button
                    hidden={roundState.status !== RoundStatus.SELF_EVAL}
                    onClick={() => nextStep({ action: 'guessed', correct: false })}
                    type="submit"
                    className="float-right py-1 px-4 text-xl border border-gray-500 rounded w-40 bg-red-200 hover:bg-red-300 mr-2 h-11"
                  >
                    I got it wrong
                  </button>
                </div>
                {/* <span className="text text-sm text-red-700 hover:underline cursor-pointer" hidden={roundState.status !== 2}>Report incorrect recognition</span> */}
              </div>
            </div>
            <div className="container lg:flex mt-4 sm:mt-12 w-min lg:w-full md:mx-auto">
              <div className="lg:w-2/5  max-w-lg w-max">
                <button onClick={mnemonicClicked} type="button" className="text-left border-b border-gray-600 cursor-pointer w-full">
                  <h3 className="inline-block">Mnemonic:</h3>
                  <span className="float-right mt-1 mr-2 text-xl border px-3 border-gray-600 rounded hover:bg-gray-200 ">{roundState.showMnemonic ? '⋀' : '⋁'}</span>
                </button>
                <div className="mt-4 text-center items-center" hidden={!roundState.showMnemonic}>
                  <MnemonicComponent mnemonic={roundState.mnemonic} showImage />
                </div>
              </div>
              <div className="lg:w-3/5">
                <div className="lg:float-right">
                  <h3 className="font-thin">Try to draw it: </h3>
                  <div className="w-auto mx-auto">
                    <DrawBoard
                      key={roundState.mnemonic.kana + gState.progress.total}
                      character={roundState.mnemonic.kana}
                      onCharacterShow={onCharacterShow}
                      showCharacter={roundState.showCharacter}
                      onDrawn={onUserHasDrawn}
                      size={drawBoardWidth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="pt-4 mt-6 text-center border-t pb-2">
          <button
            // onClick={roundState.status === 1 ? nextKana : checkAnswer}
            onClick={finishPractice}
            type="submit"
            className="py-1 px-4 text-xl border border-gray-500 rounded sm:w-56 w-full hover:bg-blue-200 hover:border-blue-900"
          >
            Finish
          </button>
        </div>
      </div>
    </>
  );
};

export default Practice;