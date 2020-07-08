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
      <span className="text-xl bg-blue-200 rounded">
        {x.text}
      </span>
    );
  });

  return (
    <div className="text-center max-w-lg w-auto">
      <div className="flex">
        <img hidden={!showImage} src={mnemonic.picture.src} alt={mnemonic.picture.alt} className="h-auto max-w-lg border border-gray-400 rounded-lg" />
      </div>
      {jsx.map(x => ({ ...x, key: Math.random() }))}
    </div>
  );
};

export default MnemonicComponent;