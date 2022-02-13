import * as React from 'react';
import KanaTable from './KanaTable';
import { ElementContext } from '../../../ElementContext';
import useWindowDimensions from '../../../useWindowDimensions';
import { buildElements } from '../../../../Helpers/Helpers';

const engkana = [
  'Hiragana',
  'Katakana',
  // 'Both',
];
const japkana = [
  'ひらがな',
  'カタカナ',
  // 'ひカ',
];

const KanaSelector: React.FC = () => {
  // 0 is Hira, 1 is Kata, 2 is both
  const { gState, setGState } = React.useContext(ElementContext);
  const [kanaType, setState] = React.useState(gState.learningHiragana ? 0 : 1);
  const [showKana, setShowKana] = React.useState(true);
  const horizontal = useWindowDimensions().width > 1000;

  const curentKana = engkana[kanaType];
  const curjapKana = japkana[kanaType];

  const KanaSelectClick = () => {
    setState(kanaType === 1 ? 0 : (kanaType + 1));
    setGState({ ...gState, learningHiragana: kanaType !== 0 });
  };

  return (
    <div className={'text-center ' + (horizontal ? 'mt-8' : '')}>
      <div className="mb-1">
        <button
          type="button"
          className="w-56 max-w-sm border-yellow-600 border-2 rounded p-1 text-center text-lg font-bold text-gray-700 hover:bg-yellow-50"
          onClick={KanaSelectClick}
        >
          <p className="-mb-1">{curentKana}</p>
          <p className="text-sm text-gray-700">{curjapKana}</p>
        </button>
        <div className="h-8">
          {!gState.learningHiragana && (
          <p>
            <input type="checkbox" onClick={() => setGState({ ...gState, ai: !gState.ai })} className="mr-2" checked={gState.ai} />
            <span>Use experimental AI to evaluate katakana</span>
          </p>
          )}
        </div>
      </div>
      <button type="button" className="border-l border-r border-t border-gray-600 rounded-t w-64 hover:border-gray-700" onClick={() => { setShowKana(!showKana); }}>
        <div className="h-4 relative">
          {/* eslint-disable-next-line max-len */}
          <svg fill="gray" style={{ marginBottom: -6 }} className="w-5 h-5 ml-2 bottom-0 absolute" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
          <p className={(!showKana ? 'text-black underline' : 'text-gray-700') + ' text-base inline-block mr-3'}>Latin</p>
          <p className={(showKana ? 'text-black underline' : 'text-gray-700') + ' text-base inline-block mr-3'}>Kana</p>
        </div>
      </button>
      <div className="">
        <KanaTable kana={curentKana} showKana={showKana} horizontal={horizontal} preSelectedEl={gState.selectedElements.length === buildElements().length ? [] : gState.selectedElements} />
      </div>
    </div>
  );
};

export default KanaSelector;
