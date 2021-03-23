import * as wanakana from 'wanakana';
import { KanaElement } from '../components/Home/Select/KanaTable/KanaTable';

export const vowels = ['a', 'i', 'u', 'e', 'o'];
export const consonants = ['k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];

export const buildElements = (): KanaElement[] => {
  const romanji: string[] = [];
  romanji.push(...vowels);
  consonants.forEach(con => {
    vowels.forEach(vow => {
      const roman = con + vow;
      if (roman !== 'we' && roman !== 'wi' && roman !== 'yi' && roman !== 'ye' && roman !== 'wu') {
        romanji.push(roman);
      }
    });
  });

  return romanji.map(r => ({
    latin: r,
    katakana: wanakana.toKatakana(r),
    hiragana: wanakana.toHiragana(r),
  }));
};

export const findUnsafe = <T>(arr: T[], find: (e: T, i?: number) => boolean): T => (arr.find(find) as never as T);
