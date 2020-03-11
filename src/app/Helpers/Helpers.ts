import { appSettings } from "../models";
import * as wanakana from 'wanakana';
import { Word } from "../Api";

export const evaluateInput = (input: string, word: Word, settings: appSettings): boolean => {
  if (input == "") {
    return false;
  }

  console.log(settings.input);
  console.log(word);
  console.log(input);

  if (settings.input.hiragana) {
    if (input === word.hiragana)
      return true;
  }
  if (settings.input.katakana) {
    if (input === word.romanji)
      return true;
  }
  if (settings.input.romanji) {
    if (input === word.romanji)
      return true;
  }

  return false;
}

export const vowels = ["a", "e", "i", "o", "u"];
export const consonants = ["k", "s","t","n","h","m","y","r","w"];

export const stringToWord = (string: string): Word => {
  return {
    english: "",
    hiragana: wanakana.toHiragana(string),
    katakana: wanakana.toKatakana(string),
    romanji: wanakana.toRomaji(string),
    jlpt: ""
  }
}