import * as React from 'react';
import { useHistory } from 'react-router';
import { ElementContext } from '../../ElementContext';
import { KanaElement } from './KanaTable';

interface Props {
  selectedElements: KanaElement[];
}

const initButtonState = {
  practice: {
    active: false, HoverText: 'Select kana to learn!', style: 'border-gray-500 bg-gray-100 text-gray-500 hover:bg-gray-200',
  },
  learn: {
    active: false, HoverText: 'Select kana to practice!', style: 'border-gray-500 bg-gray-100 text-gray-500 hover:bg-gray-200',
  },
};

const KanaTableButtons: React.FC<Props> = ({ selectedElements }) => {
  const history = useHistory();
  const context = React.useContext(ElementContext);

  let buttonState = {
    practice: { ...initButtonState.practice },
    learn: { ...initButtonState.learn },
  };
  if (selectedElements.length > 0) {
    buttonState.learn.active = true;
    buttonState.practice.active = true;
    buttonState.practice.style = 'border-green-500 bg-green-100 text-green-900 hover:bg-green-200';
    buttonState.practice.HoverText = 'Start';
    buttonState.learn.style = 'border-blue-500 bg-blue-100 text-blue-900 hover:bg-blue-200';
    buttonState.learn.HoverText = 'Practice';
  } else {
    buttonState = initButtonState;
  }
  const LearnClick = () => {
    context.setGState({
      ...context.gState,
      elements: selectedElements,
    });
    history.push('/Learn');
  };
  const PracticeClick = () => {
    context.setGState({
      ...context.gState,
      elements: selectedElements,
    });
    history.push('/Practice');
  };
  return (
    <div>
      <button
        type="button"
        className={'w-5/12 sm:w-56 border-2 rounded p-1 pt-3 text-center text-lg font-bold m-1 ' + buttonState.learn.style}
        onClick={LearnClick}
        disabled={!buttonState.learn.active}
      >
        <p className="-mb-1">Learn</p>
        <p className="text-sm text-gray-700 -mt-3 invisible">a</p>
      </button>
      <button
        type="button"
        className={'w-5/12 sm:w-56 border-2 rounded p-1 pt-3 text-center text-lg font-bold m-1 ' + buttonState.practice.style}
        onClick={PracticeClick}
        disabled={!buttonState.practice.active}
      >
        <p className="-mb-1">Practice</p>
        <p className="text-sm text-blue-700 -mt-3 invisible">a</p>
      </button>
    </div>
  );
};

export default KanaTableButtons;