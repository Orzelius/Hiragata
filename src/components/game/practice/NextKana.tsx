import * as React from 'react';
import { ElementContext } from '../../ElementContext';
import { KanaElement } from '../../Home/KanaTable/KanaTable';

interface NextKanaProps {
  kana: KanaElement;
  onCancel: () => void;
  onNext: () => void;
}

const NextKana: React.FC<NextKanaProps> = ({ kana, onCancel, onNext }) => {
  const { gState } = React.useContext(ElementContext);
  const currentKana = gState.learningHiragana ? kana.hiragana : kana.katakana;
  return (
    <div className="text-center mt-20 mb-24">
      <h1>You are ready to learn your next character :D</h1>
      <h4 className="StrokeOrderFont" style={{ fontSize: '8rem' }}>{currentKana}</h4>
      <button
        onClick={onCancel}
        type="submit"
        className="py-1 px-4 text-xl border border-gray-500 rounded sm:w-56 w-full hover:bg-blue-200 hover:border-blue-900 inline-block mb-2 sm:mr-2"
      >
        Practice more
      </button>
      <button
        onClick={onNext}
        type="submit"
        className="py-1 px-4 text-xl border border-gray-500 rounded sm:w-56 w-full hover:bg-blue-200 hover:border-blue-900"
      >
        Learn
        {' '}
        {currentKana}
      </button>
    </div>
  );
};

export default NextKana;