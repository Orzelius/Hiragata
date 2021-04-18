import * as wanakana from 'wanakana';
import mnemonicHira from '../../assets/json/hiragana.json';
import mnemonicKata from '../../assets/json/katakana.json';
import { Mnemonic } from '../../models';
import { findUnsafe } from '../../Helpers/Helpers';
import { KanaElement } from '../Home/Select/KanaTable/KanaTable';

const getMnemonic = (element: KanaElement, hiragana: boolean): Mnemonic => {
  const searchArr = hiragana ? mnemonicHira : mnemonicKata;
  const mnemonicJson = findUnsafe(searchArr, x => wanakana.toHiragana(x.letter) === element.hiragana);
  const mnemonic: Mnemonic = {
    kana: mnemonicJson.letter,
    latin: wanakana.toRomaji(mnemonicJson.letter),
    picture: {
      alt: mnemonicJson.picture.alt,
    },
    mnemonic: mnemonicJson.mnemonic.map(x => ({
      isCode: !!x.code,
      text: (x.code ? x.code : x.text) || '',
    })),
  };
  return mnemonic;
};

export default getMnemonic;