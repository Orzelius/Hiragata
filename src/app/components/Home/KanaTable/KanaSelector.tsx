import * as React from 'react';
import KanaTable from './KanaTable';
import { ElementContext } from '../../ElementContext';

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
  const context = React.useContext(ElementContext);
  const [kanaType, setState] = React.useState(context.state.learningHiragana ? 0 : 1);
  const [showKana, setShowKana] = React.useState(false);

  const curentKana = engkana[kanaType];
  const curjapKana = japkana[kanaType];

  const KanaSelectClick = () => {
    setState(kanaType === 1 ? 0 : (kanaType + 1));
    context.setState({ ...context.state, learningHiragana: kanaType !== 0 });
  };

  return (
    <div className="text-center">
      <div className="mb-1">
        <button
          type="button"
          className="w-5/12 max-w-sm border-orange-600 border-2 rounded p-1 text-center text-lg font-bold text-gray-700 hover:bg-orange-100"
          onClick={KanaSelectClick}
        >
          <p className="-mb-1">{curentKana}</p>
          <p className="text-sm text-gray-700">{curjapKana}</p>
        </button>
      </div>
      <button type="button" className="border-l border-r border-t border-gray-600 rounded-t w-7/12 max-w-sm hover:border-gray-700" onClick={() => { setShowKana(!showKana); }}>
        <div className="h-4 relative">
          {/* eslint-disable-next-line max-len */}
          <svg fill="gray" style={{ marginBottom: -6 }} className="w-5 h-5 ml-2 bottom-0 absolute" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" /></svg>
          <p className={(!showKana ? 'text-black underline' : 'text-gray-700') + ' text-base inline-block mr-3'}>Latin</p>
          <p className={(showKana ? 'text-black underline' : 'text-gray-700') + ' text-base inline-block mr-3'}>Kana</p>
        </div>
      </button>
      <div className="">
        <KanaTable kana={curentKana} showKana={showKana} />
      </div>
    </div>
  );
};

export default KanaSelector;
