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
import NextKana from './NextKana';
import { KanaElement } from '../../Home/Select/KanaTable/KanaTable';

enum RoundStatus {
  DRAWING,
  CORRECT,
  INCORRECT,
  SELF_EVAL,
  HAS_NOT_DRAWN,
  LEARNING,
  TO_LEARNING,
  GIVEN_UP,
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
    memoryRefresher: Math.floor(gState.progress.elements.filter(el => el.status === 'green').length * 1.5) + 5,
    maxUrgency: 20,
    maxStreak: { negative: 10, positive: 4 },
    firstLearnBatch: 3,
  });
  if (!gState || !gState.selectedElements || gState.selectedElements.length === 0) {
    history.push('/');
    return (null);
  }

  const [learnState, setLearnState] = React.useState(evaluator.chooseLearn(gState.progress));
  const [showProgress, setShowProgress] = React.useState(false);
  const makeQuestion = (element: KanaElement) => {
    const kana = `${gState.learningHiragana ? 'Hiragana' : 'Katakana'}`;
    return (
      <span className="text-xl sm:text-3xl text-gray-900">
        <span className="mr-2">{`Draw the ${kana} for `}</span>
        <span className="text-gray-800 text-xl sm:text-4xl bg-blue-200 rounded-md px-1">
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

  type CurRoundStatuses = { action: 'learnt' } | { action: 'guessed', correct: boolean, penalty: boolean } | { action: 'given up', correct: false };
  const nextStep = (curRoundStatuses: CurRoundStatuses) => {
    const progressElI = gState.progress.elements.findIndex(e => e.element === roundState.element);
    const newGstate: GState = ({ ...gState });

    if ((curRoundStatuses.action === 'guessed' && curRoundStatuses.penalty) || curRoundStatuses.action === 'given up') {
      newGstate.progress.elements[progressElI].guesses.unshift({ correct: curRoundStatuses.correct, time: Date.now() });
      newGstate.progress.total++;
      newGstate.progress = evaluator.calculateUrgency({ el: roundState.element, correct: curRoundStatuses.correct }, newGstate.progress);
    } else if (curRoundStatuses.action === 'learnt') {
      newGstate.progress.elements[progressElI].status = 'fresh';
      newGstate.progress.elements[progressElI].urgency = 15;
    }

    let nextEl: KanaElement;
    let newStatus: RoundStatus;
    let showMnemonic = false;

    const learn = evaluator.chooseLearn(newGstate.progress);
    if (learn !== 'nothing to learn' && learn.mustBeLearnt) {
      nextEl = learn.element;
      newStatus = RoundStatus.LEARNING;
    } else if (learn !== 'nothing to learn' && learn.canBeLearnt) {
      nextEl = learn.element;
      newStatus = RoundStatus.TO_LEARNING;
    } else if (curRoundStatuses.action === 'given up') {
      newStatus = RoundStatus.GIVEN_UP;
      showMnemonic = true;
      nextEl = roundState.element; // Same as before
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
      showMnemonic,
      showCharacter: false,
    });
  };

  const checkAnswer = () => {
    // Fancy AI here in the future
    setRoundState({
      ...roundState,
      showMnemonic: true,
      status: RoundStatus.SELF_EVAL,
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
  } else if (roundState.status === RoundStatus.GIVEN_UP) {
    btn.buttonText = 'Next';
    btn.buttonStyle = 'bg-red-200 hover:bg-red-300';
  }

  const evalButtonClicked = () => {
    // eslint-disable-next-line default-case
    switch (roundState.status) {
      case RoundStatus.DRAWING:
        checkAnswer();
        break;
      case RoundStatus.CORRECT:
        nextStep({ action: 'guessed', penalty: true, correct: true });
        break;
      case RoundStatus.INCORRECT:
        nextStep({ action: 'guessed', penalty: true, correct: false });
        break;
      case RoundStatus.SELF_EVAL:
        nextStep({ action: 'guessed', penalty: true, correct: true });
        break;
      case RoundStatus.HAS_NOT_DRAWN:
        nextStep({ action: 'given up', correct: false });
        break;
      case RoundStatus.TO_LEARNING:
        nextStep({ action: 'guessed', penalty: true, correct: true });
        break;
      case RoundStatus.GIVEN_UP:
        nextStep({ action: 'guessed', penalty: false, correct: false });
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
      {showProgress && <EvaluatorDebug evaluator={evaluator} />}
      <div className="lg:mt-5">
        <ProgressBar completed={learnState !== 'nothing to learn' ? learnState.percent : 0} isLabelVisible={false} height="5px" />
        {roundState.status === RoundStatus.TO_LEARNING ? <NextKana kana={roundState.element} onCancel={onCancelLearn} onNext={onToLearn} /> : (
          <>
            <div className="mt-2">
              <h4 className="mr-3 inline-block">
                <span className="text-xl sm:text-4xl text-gray-600 font-light inline-block mr-2">
                  {gState.progress.total}
                </span>
                {roundState.question}
              </h4>
              <div className="mt-4 float-right">
                <div>
                  <div onClick={() => setShowProgress(!showProgress)} className="inline-block h-11 w-8 mr-1 cursor-pointer hover:bg-gray-100" title="Show progress">
                    {/* eslint-disable-next-line max-len */}
                    <svg fill="gray" className="w-5 h-5 mt-3 mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
                  </div>
                  <button
                    onClick={evalButtonClicked}
                    type="submit"
                    className={`float-right py-1 px-4 text-xl border border-gray-500 rounded h-11 w-40 ${btn.buttonStyle}`}
                  >
                    {btn.buttonText}
                  </button>
                  <button
                    hidden={roundState.status !== RoundStatus.SELF_EVAL}
                    onClick={() => nextStep({ action: 'guessed', penalty: true, correct: false })}
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
              <div className="lg:w-2/5  max-w-lg w-full">
                <button onClick={mnemonicClicked} type="button" className="text-left border-b border-gray-600 cursor-pointer w-full">
                  <h3 className="inline-block text-2xl sm:text-3xl">Mnemonic:</h3>
                  <span className="text-s float-right mt-1 mr-2 sm:text-xl border px-3 border-gray-600 rounded hover:bg-gray-200 ">{roundState.showMnemonic ? '⋀' : '⋁'}</span>
                </button>
                <div className="mt-4 text-center items-center" hidden={!roundState.showMnemonic}>
                  <MnemonicComponent mnemonic={roundState.mnemonic} showImage hiragana={gState.learningHiragana} />
                </div>
              </div>
              <div className="lg:w-3/5">
                <div className="lg:float-right">
                  <h3 className="font-thin text-2xl sm:text-3xl">Try to draw it: </h3>
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