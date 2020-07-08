import * as wanakana from 'wanakana';
import { Word } from '../Api';

export const vowels = ['a', 'i', 'u', 'e', 'o'];
export const consonants = ['k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];

export const stringToWord = (string: string): Word => ({
  english: '',
  hiragana: wanakana.toHiragana(string),
  katakana: wanakana.toKatakana(string),
  romanji: wanakana.toRomaji(string),
  jlpt: '',
});