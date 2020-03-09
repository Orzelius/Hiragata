import * as React from 'react';
import { stringToWord, consonants, vowels } from '../../../Helpers/Helpers';
import KanaElement from './KanaElement';
import * as wanakana from 'wanakana';

interface element {
  latin: string
  hiragana: string
  katakana: string
  isSelected: boolean
  isBorder: boolean
  x: number
  y: number
}

let basicElement: element = {
  hiragana: "",
  isBorder: false,
  katakana: "",
  latin: "",
  isSelected: false,
  x: 0,
  y: 0,
}

let kanaTable: element[][] = [[]];
vowels.forEach((vowel, index) => {
  if (index === 0) {
    kanaTable[0].push({ ...basicElement, latin: "-" })
  }
  kanaTable[0].push({
    ...basicElement,
    hiragana: wanakana.toHiragana(vowel),
    katakana: wanakana.toKatakana(vowel),
    latin: vowel,
    isBorder: true,
    x: index
  })
})


consonants.forEach((consonant, y) => {
  kanaTable.push([]);
  let syllables: string[] = [];
  syllables.push(consonant);
  vowels.forEach(vowel => {
    syllables.push(consonant + vowel);
  });
  syllables.forEach((syllable, x) => {
    if (x === 0) {
      kanaTable[1 + y].push({
        ...basicElement,
        latin: syllable,
        isBorder: true,
        x: 0,
      })
    }
    else {
      kanaTable[1 + y].push({
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

kanaTable.forEach((row, y) => {
  row.forEach((element, x) => {
    kanaTable[y][x] = {
      ...kanaTable[y][x],
      isBorder: x === 0 || y === 0,
      x: x,
      y: y,
    }
  })
});

const KanaTable: React.FC = () => {


  const [state, setState] = React.useState({ kanaTable: kanaTable });


  const onElementHover = (x: number, y: number) => {

  }

  const onElementClick = (x: number, y: number) => {
    let newState = { ...state }
    newState.kanaTable[x][y].isSelected = !newState.kanaTable[x][y].isSelected;
    console.log(newState.kanaTable[x][y]);
    setState(newState);
    console.log(state.kanaTable[x][y])
  }



  return (
    <div className="">
      {state.kanaTable.map((kanaRow, y) => {
        let rowElements = kanaRow.map((kana, x) => {
          return (
            <KanaElement
              hover={() => { }}
              key={x + ";" + y}
              click={() => { onElementClick(kana.x, kana.y) }}
              hiragana={kana.hiragana}
              katakana={kana.katakana}
              latin={kana.latin}
              isSelected={kana.isSelected}
              isBorder={kana.isBorder}
              x={kana.x}
              y={kana.y}
            ></KanaElement>
          )
        })
        return (
          <div key={y + "r"}>
            {...rowElements}
          </div>
        )
      })}
    </div>
  );
}

export default KanaTable;