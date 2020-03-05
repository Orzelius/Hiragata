import * as React from 'react';
import { stringToWord, consonants, vowels } from '../../../Helpers/Helpers';
import KanaElement from './KanaElement';
import * as wanakana from 'wanakana';

interface element {
  latin: string
  hiragana: string
  katakana: string
  selected: boolean
  isBorder: boolean
  x: number
  y: number
  jsx: JSX.Element | null
}

let basicElement: element = {
  hiragana: "",
  isBorder: false,
  katakana: "",
  latin: "",
  selected: false,
  x: 0,
  y: 0,
  jsx: null
}

let kanaTable: element[][] = [[]];
vowels.forEach((vowel, index) => {
  if (index === 0) {
    kanaTable[0].push({ ...basicElement, latin: "-" })
  }
  else {
    kanaTable[0].push({
      ...basicElement,
      hiragana: wanakana.toHiragana(vowel),
      katakana: wanakana.toKatakana(vowel),
      latin: vowel,
      isBorder: true,
      x: index
    })
  }
})

consonants.forEach((consonant, y) => {
  let syllables: string[] = [];
  syllables.push(consonant);
  vowels.forEach(vowel => {
    syllables.push(consonant + vowel);
  });
  syllables.forEach((syllable, x) => {
    if (x === 0) {
      kanaTable[0].push({
        ...basicElement,
        latin: syllable,
        isBorder: true,
        x: 0,
      })
    }
    else {
      kanaTable[0].push({
        ...basicElement,
        hiragana: wanakana.toHiragana(syllable),
        katakana: wanakana.toKatakana(syllable),
        latin: syllable,
        isBorder: true,
        x: x,
        y: y + 1
      })
    }
  });
});

const KanaTable: React.FC = () => {

  let block: JSX.Element[][] = [[]];

  const onElementHover = (enter: boolean, x: number, y: number, isBorder: boolean) => {

  }

  const onElementClick = (enter: boolean, x: number, y: number, isBorder: boolean) => {

  }

  console.log(kanaTable);

  kanaTable.forEach((row, y) => {
    row.forEach((element, x) => {
      kanaTable[y][x].jsx = (
        <KanaElement
          latin={element.latin}
          x={x}
          y={y}
          isBorder={x == 0 || y == 0}
          selected={false}
          hiragana={element.hiragana}
          katakana={element.katakana}
          click={onElementClick}
          hover={onElementHover}
          key={x + ";" + y}>
        </KanaElement>
      );
    })
  });

  return (
    <div className="">
      {kanaTable.map(kanaRow => {
        return kanaRow.map(kana => {
          return kana.jsx;
        }) 
      }) }
    </div>
  );
}

export default KanaTable;