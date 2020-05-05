import * as React from 'react';
import KanaTable from './KanaTable';

const kana = [
  'Hiragana',
  'Katakana',
  'Both',
];

export interface Element {
  latin: string;
  katakana: string;
  hiragana: string;
}

const initStartButtonState = { active: false, HoverText: 'Select kana to learn!', style: 'border-gray-400 bg-gray-100 text-gray-500' };
const initKanaselect: Element[] = [];
const KanaSelector: React.FC = () => {
  // 0 is Hira, 1 is Kata, 2 is both
  const [kanaType, setState] = React.useState(0);
  const [kanaSelected, setSelection] = React.useState(initKanaselect);
  const [startButtonState, setStartButtonState] = React.useState(initStartButtonState);

  const curKana = kana[kanaType];

  const KanaSelectClick = () => {
    setState(kanaType === 2 ? 0 : (kanaType + 1));
  };

  const StartClick = () => {
    setState(kanaType === 2 ? 0 : (kanaType + 1));
  };

  const SelectionChanged = (newSelection: Element[]) => {
    console.log('Selection changed', newSelection);
    setSelection(newSelection);
    let newStartButtonState = { ...initStartButtonState };
    if (newSelection.length > 0) {
      newStartButtonState.active = true;
      newStartButtonState.style = 'border-green-500 bg-green-100 text-green-900 hover:bg-green-200';
      newStartButtonState.HoverText = 'Start';
    } else {
      newStartButtonState = initStartButtonState;
    }
    setStartButtonState(newStartButtonState);
  };

  return (
    <div className="text-center">
      <div className="">
        <button
          type="button"
          className="inline-block w-5/12 max-w-sm border-orange-600 border-2 rounded p-3 text-center text-lg font-bold text-gray-700 hover:bg-orange-100"
          onClick={KanaSelectClick}
        >
          {curKana}
        </button>
        <button
          type="button"
          className="inline-block w-5/12 max-w-sm border-2 rounded p-3 text-center text-lg font-bold m-1 border-green-500 bg-green-100 text-green-900 hover:bg-green-200"
          onClick={StartClick}
          disabled={startButtonState.active}
        >
          Start
        </button>
      </div>
      <div className="mt-3">
        <KanaTable kana={curKana} setSelect={SelectionChanged} />
      </div>
    </div>
  );
};

export default KanaSelector;
