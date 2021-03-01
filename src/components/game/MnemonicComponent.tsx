import * as React from 'react';
import { Mnemonic } from '../../models';

interface Props {
  mnemonic: Mnemonic;
  showImage: boolean;
}
const MnemonicComponent: React.FC<Props> = ({ mnemonic, showImage }) => {
  const jsx = mnemonic.mnemonic.map(x => {
    if (!x.isCode) {
      return (
        <span className="text-xl">
          {x.text}
        </span>
      );
    }
    return (
      <span className="text-xl bg-blue-200 rounded" key={mnemonic.kana}>
        {x.text}
      </span>
    );
  });

  return (
    <div className="text-center max-w-lg lg:max-w-2xl w-full">
      <div className="flex">
        <img hidden={!showImage} src={mnemonic.picture.src} alt={mnemonic.picture.alt} className="w-full border border-gray-600 rounded-lg" />
      </div>
      {jsx.map(x => ({ ...x, key: Math.random() }))}
      <h4 className="StrokeOrderFont" style={{ fontSize: '6rem' }}>{mnemonic.kana}</h4>
    </div>
  );
};

export default MnemonicComponent;