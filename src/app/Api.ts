import * as wanakana from 'wanakana';

export interface Word {
  katakana: string,
  hiragana: string,
  english: string,
  romanji: string,
  kanji?: string;
  jlpt: string
}

const wordList = require('./all_jap.json');

// export const makeJson = () => {
//   let kanaList: any = [];
//   let KanjiList: any = [];
//   let hiraganaList: any = [];


//   jlptListN5.forEach((element: any) => {
//     if (wanakana.isKatakana(element.kanji)) {
//       kanaList.push({ katakana: element.kanji, english: element.english, jlpt: "n5" });
//     }
//     else if (wanakana.isKana(element.kanji)) {
//       hiraganaList.push({ hiragana: element.kanji, english: element.english, jlpt: "n5" });
//     }
//     else {
//       KanjiList.push({ ...element, jlpt: "n5" });
//     }
//   });
//   jlptListN4.forEach((element: any) => {
//     if (wanakana.isKatakana(element.kanji)) {
//       kanaList.push({ katakana: element.kanji, english: element.english, jlpt: "n4" });
//     }
//     else if (wanakana.isKana(element.kanji)) {
//       hiraganaList.push({ hiragana: element.kanji, english: element.english, jlpt: "n4" });
//     }
//     else {
//       KanjiList.push({ ...element, jlpt: "n4" });
//     }
//   });
//   console.log(JSON.stringify({ katakana: kanaList, kanji: KanjiList, hiragana: hiraganaList }));
// }

export const getWord = (kanji: boolean = true, katakana: boolean = true, hiragana: boolean = true): Word => {
  if (!kanji && !katakana && !hiragana) {
    console.error("All parameters false");
    return;
  }
  let wordArray = [];
  let words: string[] = []
  if (kanji) {
    wordArray.push(wordList.kanji);
    words.push("kanji");
  }
  if (katakana) {
    wordArray.push(wordList.katakana);
    words.push("katakana");
  }
  if (hiragana) {
    wordArray.push(wordList.hiragana);
    words.push("hiragana");
  }
  let type = words[Math.floor(Math.random() * words.length)];

  let word: any;
  switch (type) {
    case ("kanji"):
      word = wordList.kanji[Math.floor(Math.random() * wordList.kanji.length)];
      break;
    case ("katakana"):
      word = wordList.katakana[Math.floor(Math.random() * wordList.katakana.length)];
      break;
    case ("hiragana"):
      word = wordList.hiragana[Math.floor(Math.random() * wordList.hiragana.length)];
      break;
  }
  let outWord: Word = {
    english: word.english,
    kanji: word.kanji,
    hiragana: word.hiragana ? word.hiragana : wanakana.toHiragana(word.katakana),
    katakana: word.katakana ? word.katakana : wanakana.toHiragana(word.hiragana),
    romanji: wanakana.toRomaji(word.hiragana),
    jlpt: word.jlpt
  }
  return outWord;
}