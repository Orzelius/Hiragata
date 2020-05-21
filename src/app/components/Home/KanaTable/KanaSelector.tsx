import * as React from 'react';
import KanaTable from './KanaTable';

const engkana = [
  'Hiragana',
  'Katakana',
  'Both',
];
const japkana = [
  'ひらがな',
  'カタカナ',
  'ひカ',
];

export interface Element {
  latin: string;
  katakana: string;
  hiragana: string;
}

const initStartButtonState = { active: false, HoverText: 'Select kana to learn!', style: 'border-gray-500 bg-gray-100 text-gray-500 hover:bg-gray-200' };
const initKanaselect: Element[] = [];
const KanaSelector: React.FC = () => {
  // 0 is Hira, 1 is Kata, 2 is both
  const [kanaType, setState] = React.useState(0);
  const [showKana, setShowKana] = React.useState(false);
  const [kanaSelected, setSelection] = React.useState(initKanaselect);
  const [startButtonState, setStartButtonState] = React.useState(initStartButtonState);

  const curengKana = engkana[kanaType];
  const curjapKana = japkana[kanaType];

  const KanaSelectClick = () => {
    setState(kanaType === 2 ? 0 : (kanaType + 1));
  };

  const StartClick = () => {
    // setState(kanaType === 2 ? 0 : (kanaType + 1));
  };

  const SelectionChanged = (newSelection: Element[]) => {
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
          className="w-5/12 max-w-sm border-orange-600 border-2 rounded p-1 text-center text-lg font-bold text-gray-700 hover:bg-orange-100"
          onClick={KanaSelectClick}
        >
          <p className="-mb-1">{curengKana}</p>
          <p className="text-sm text-gray-700">{curjapKana}</p>
        </button>
        <button
          type="button"
          className={'w-5/12 max-w-sm border-2 rounded p-1 pt-3 text-center text-lg font-bold m-1 ' + startButtonState.style}
          onClick={StartClick}
          disabled={startButtonState.active}
        >
          <p className="-mb-1">Start</p>
          <p className="text-sm text-gray-700 -mt-3 invisible">a</p>
        </button>
      </div>
      <button type="button" className="border-b border-r border-l border-gray-500 rounded-b pb-1 w-48 hover:border-gray-600" onClick={() => { setShowKana(!showKana); }}>
        <div>
          <p className={(!showKana ? 'text-black underline' : 'text-gray-700') + ' text-base inline-block mr-3'}>Latin</p>
          <p className={(showKana ? 'text-black underline' : 'text-gray-700') + ' text-base inline-block mr-3'}>Kana</p>
        </div>
      </button>
      <div className="mt-3">
        <KanaTable kana={curengKana} showKana={showKana} setSelect={SelectionChanged} />
      </div>
    </div>
  );
};

export default KanaSelector;
