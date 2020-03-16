import * as React from 'react';
import KanaTable from './KanaTable';

const kana = [
  'Hiragana',
  'Katakana',
  'Both',
];

const KanaSelector: React.FC = () => {
  const [state, setState] = React.useState(1);

  const curKana = kana[state];

  const buttonClick = () => {
    setState(state === 2 ? 0 : (state + 1));
  };

  return (
    <div className="content-center">
      <div className="">
        <button
          type="button"
          className="max-w-md w-full border-orange-600 border-2 rounded p-3 text-center text-lg font-bold text-gray-700 hover:bg-orange-100"
          onClick={buttonClick}
        >
          {curKana}
        </button>
      </div>
      <div className="mt-3">
        <KanaTable />
      </div>
    </div>
  );
};

export default KanaSelector;
