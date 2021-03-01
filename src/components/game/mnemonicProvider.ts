import * as wanakana from 'wanakana';
import { KanaElement } from '../Home/KanaTable/KanaTable';
import mnemonicHira from '../../assets/json/hiragana.json';
import mnemonicKata from '../../assets/json/katakana.json';
import { Mnemonic } from '../../models';
import { findUnsafe } from '../../Helpers/Helpers';

const getMnemonic = (element: KanaElement, hiragana: boolean): Mnemonic => {
  const searchArr = hiragana ? mnemonicHira : mnemonicKata;
  const mnemonicJson = findUnsafe(searchArr, x => wanakana.toHiragana(x.letter) === element.hiragana);
  const mnemonic: Mnemonic = {
    kana: mnemonicJson.letter,
    latin: wanakana.toRomaji(mnemonicJson.letter),
    picture: {
      alt: mnemonicJson.picture.alt,
      src: '',
    },
    mnemonic: mnemonicJson.mnemonic.map(x => ({
      isCode: !!x.code,
      text: (x.code ? x.code : x.text) || '',
    })),
  };
  mnemonic.picture.src = `${process.env.PUBLIC_URL}/images/${hiragana ? 'hiragana' : 'katakana'}/${mnemonic.latin}.jpg`;
  return mnemonic;
};

export default getMnemonic;