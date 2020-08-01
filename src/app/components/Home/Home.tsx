import * as React from 'react';
import { Container } from '../../Helpers/BasicComponents';
import getMnemonic from '../game/mnemonicProvider';

const Home: React.FC = () => {
  const [state, setState] = React.useState(getMnemonic({ hiragana: 'あ', katakana: 'ア', latin: 'a' }, false));
  const mnemonic = state.mnemonic.map(x => {
    if (!x.isCode) {
      return (
        <span className="text-xl">
          {x.text}
        </span>
      );
    }
    return (
      <span className="text-xl bg-blue-200 rounded">
        {x.text}
      </span>
    );
  });
  return (
    <Container className="container sm:p-2 lg:px-32 pb-8">
      <div className="text-center">
        <h1 className="text-6xl">Hiragata</h1>
        <h2 className="text-2xl leading-none">Learn to write and read kana using memorable mnemonics!</h2>
        <div>
          <div className="mt-4">
            <div className="mt-12">
              <h3 className="text-gray-900 z-10 leading-none">Easy to understand mnemonics!</h3>
              <img src={state.picture.src} alt={state.picture.alt} className="h-auto max-w-sm mx-auto w-full -mb-6" />
              {mnemonic}
            </div>
            <div className="mt-12">
              <h3 className="text-gray-900 leading-none">Correct writing order!</h3>
              <h4 className="StrokeOrderFont -mt-12" style={{ fontSize: '12rem' }}>{state.kana}</h4>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
