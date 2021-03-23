import * as React from 'react';
import { ElementContext } from '../../ElementContext';
import getMnemonic from '../mnemonicProvider';
import MnemonicComponent from '../MnemonicComponent';
import DrawBoard from '../DrawBoard';
import useWindowDimensions from '../../useWindowDimensions';
import { KanaElement } from '../../Home/Select/KanaTable/KanaTable';

interface LearnProps {
  onNextBtnClick: () => void;
  element: KanaElement;
}

const Learn: React.FC<LearnProps> = ({ element, onNextBtnClick }) => {
  const globalState = React.useContext(ElementContext);
  const [showKana, setShowKana] = React.useState(true);

  const learningHiragana = globalState.gState.learningHiragana;
  const kanaChar = learningHiragana ? element.hiragana : element.katakana;

  const screenWidth = useWindowDimensions().width;
  const drawBoardWidth = screenWidth < 520 ? screenWidth - 30 : 500;

  return (
    <div className="lg:mt-10">
      <h4>
        <span className="text-3xl text-gray-900">
          <span className="mr-2">Get familiar with letter</span>
          <span className="kanaStyle mr-2">{kanaChar}</span>
          <span className="text-gray-800">
            (
            {element.latin}
            )
          </span>
        </span>
      </h4>
      <div className="text-center sm:text-left mt-2">
        <button
          onClick={onNextBtnClick}
          type="button"
          className="py-1 px-4 text-xl border border-gray-500 rounded inline-block hover:bg-gray-200 w-1/2 sm:w-40 float-right"
        >
          Next!
        </button>
      </div>
      <div className="container lg:flex mt-4 sm:mt-12 w-min lg:w-full md:mx-auto">
        <div className="lg:w-2/5">
          <h3 className="font-thin">Mnemonic: </h3>
          <MnemonicComponent mnemonic={getMnemonic(element, learningHiragana)} showImage />
        </div>
        <div className="lg:w-3/5">
          <div className="lg:float-right">
            <h3 className="font-thin">Try to draw it: </h3>
            <DrawBoard key={element.latin} character={kanaChar} onCharacterShow={() => setShowKana(!showKana)} showCharacter={showKana} onDrawn={() => undefined} size={drawBoardWidth} />
          </div>
        </div>
      </div>
      {/* <img src={`assets/${globalState.state.learningHiragana ? 'hiragana' : 'katakana'}/${wanakana.toRomaji(state.mnemonic.letter)}.jpg`} alt="" /> */}
    </div>
  );
};

export default Learn;