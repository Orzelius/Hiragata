import * as wanakana from 'wanakana';
import { AppSettings } from '../models';
import { Word } from '../Api';

export const evaluateInput = (input: string, word: Word, settings: AppSettings): boolean => {
  if (input == '') {
    return false;
  }

  console.log(settings.input);
  console.log(word);
  console.log(input);

  if (settings.input.hiragana) {
    if (input === word.hiragana) return true;
  }
  if (settings.input.katakana) {
    if (input === word.romanji) return true;
  }
  if (settings.input.romanji) {
    if (input === word.romanji) return true;
  }

  return false;
};

export const vowels = ['a', 'i', 'u', 'e', 'o'];
export const consonants = ['k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'];

export const stringToWord = (string: string): Word => ({
  english: '',
  hiragana: wanakana.toHiragana(string),
  katakana: wanakana.toKatakana(string),
  romanji: wanakana.toRomaji(string),
  jlpt: '',
});