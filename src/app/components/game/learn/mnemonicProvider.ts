import * as wanakana from 'wanakana';
import { KanaElement } from '../../Home/KanaTable/KanaTable';
import mnemonicHira from '../../../../assets/json/hiragana.json';
import mnemonicKata from '../../../../assets/json/katakana.json';
import { Mnemonic } from '../../../models';

const getMnemonic = (element: KanaElement, hiragana: boolean): Mnemonic => {
  const searchArr = hiragana ? mnemonicHira : mnemonicKata;
  const mnemonicJson = searchArr.find(x => wanakana.toHiragana(x.letter) === element.hiragana);
  const mnemonic: Mnemonic = {
    kana: mnemonicJson.letter,
    latin: wanakana.toRomaji(mnemonicJson.letter),
    picture: {
      alt: mnemonicJson.picture.alt,
      src: '',
    },
    mnemonic: null,
  };
  mnemonic.picture.src = `/assets/${hiragana ? 'hiragana' : 'katakana'}/${mnemonic.latin}.jpg`;
  mnemonic.mnemonic = mnemonicJson.mnemonic.map(x => ({
    isCode: !!x.code,
    text: x.code ? x.code : x.text,
  }));
  console.log(mnemonic);
  return mnemonic;
};

export default getMnemonic;