import * as React from 'react';
import { stringToWord, consonants, vowels } from '../../../Helpers/Helpers';
import KanaElement from './KanaElement';
import * as wanakana from 'wanakana';

interface element {
  latin: string
  kana: string
  isSelected: boolean
  isHovered: boolean
  isBorder: boolean
  x: number
  y: number
}

let basicElement: element = {
  kana: "",
  isBorder: false,
  latin: "",
  isSelected: false,
  isHovered: false,
  x: 0,
  y: 0,
}

let initialKanaTable: element[][] = [[]];
vowels.forEach((vowel, index) => {
  if (index === 0) {
    initialKanaTable[0].push({ ...basicElement, latin: "-" })
  }
  initialKanaTable[0].push({
    ...basicElement,
    kana: (wanakana.toHiragana(vowel) + "" + wanakana.toKatakana(vowel)),
    latin: vowel,
    isBorder: true,
    x: index
  })
})


consonants.forEach((consonant, y) => {
  initialKanaTable.push([]);
  let syllables: string[] = [];
  syllables.push(consonant);
  vowels.forEach(vowel => {
    syllables.push(consonant + vowel);
  });
  syllables.forEach((syllable, x) => {
    if (x === 0) {
      initialKanaTable[1 + y].push({
        ...basicElement,
        latin: syllable,
        isBorder: true,
        x: 0,
      })
    }
    else {
      initialKanaTable[1 + y].push({
        ...basicElement,
        kana: wanakana.toHiragana(syllable) + " " + wanakana.toKatakana(syllable),
        latin: syllable,
        isBorder: true,
        x: x,
        y: y + 1
      })
    }
  });
});

initialKanaTable.forEach((row, y) => {
  row.forEach((element, x) => {
    initialKanaTable[y][x] = {
      ...initialKanaTable[y][x],
      isBorder: x === 0 || y === 0,
      x: x,
      y: y,
    }
  })
});

const KanaTable: React.FC = () => {


  const [state, setState] = React.useState({ kanaTable: initialKanaTable });


  const onElementHover = (x: number, y: number, hoverIn = true) => {
    let newState = { ...state };
    newState.kanaTable[y][x].isHovered = hoverIn;
    if (newState.kanaTable[y][x].isBorder) {
      if (x == 0) {
        newState.kanaTable[y] = newState.kanaTable[y].map(e => {
          e.isHovered = hoverIn;
          return e;
        })
      }
      if (y == 0) {
        newState.kanaTable.forEach((row, rowIndex) => {
          newState.kanaTable[rowIndex][x].isHovered = hoverIn;
        })
      }
      if (y == 0 && x == 0) {
        newState.kanaTable = newState.kanaTable.map(row => {
          return (
            row.map(element => { return ({ ...element, isHovered: hoverIn }) })
          )
        })
      }
    }
    setState(newState);
  }

  const onElementClick = (x: number, y: number) => {
    //Elements that have changed, array
    let changes = [[x, y]];

    let newState = { ...state };
    let isSelected = newState.kanaTable[y][x].isSelected;

    //Select individual
    newState.kanaTable[y][x].isSelected = !isSelected;

    //Select rows
    if (newState.kanaTable[y][x].isBorder) {
      if (x == 0) {
        newState.kanaTable[y] = newState.kanaTable[y].map((e) => {
          e.isSelected = !isSelected;
          changes.push([e.x, y]);
          return e;
        })
      }
      if (y == 0) {
        newState.kanaTable.forEach((row, rowIndex) => {
          newState.kanaTable[rowIndex][x].isSelected = !isSelected;
          changes.push([x, rowIndex]);
        })
      }
      if (y == 0 && x == 0) {
        newState.kanaTable = newState.kanaTable.map(row => {
          return (
            row.map(element => { return ({ ...element, isSelected: !isSelected }) })
          )
        })
      }
    }

    //Deselect border elements
    if (isSelected) {
      newState.kanaTable[0][x].isSelected = false;
      newState.kanaTable[y][0].isSelected = false;
    }

    console.log(changes);
    //Select/deselect borders, if every element in row/column in selected
    changes.forEach(change => {
      //Check Y row (up/down) 
      let allSelected = true;
      for (let y = 1; y < newState.kanaTable.length && allSelected; y++) {
        if(!newState.kanaTable[y][change[0]].isSelected){
          allSelected = false;
        }
      }
      newState.kanaTable[0][change[0]].isSelected = allSelected;

      //Check X column (right/left)
      allSelected = true;
      for (let x = 1; x < newState.kanaTable[change[1]].length; x++) {
        if(!newState.kanaTable[change[1]][x].isSelected){
          console.log(change[1], x)
          allSelected = false;
        }
      }
      newState.kanaTable[change[1]][0].isSelected = allSelected;
    });


    setState(newState);
  }

  return (
    <div className="">
      {state.kanaTable.map((kanaRow, y) => {
        let rowElements = kanaRow.map((kana, x) => {
          return (
            <KanaElement
              hoverIn={() => { onElementHover(kana.x, kana.y, true) }}
              hoverOut={() => { onElementHover(kana.x, kana.y, false) }}
              key={x + ";" + y}
              click={() => { onElementClick(kana.x, kana.y) }}
              kana={kana.kana}
              latin={kana.latin}
              isSelected={kana.isSelected}
              isBorder={kana.isBorder}
              isHovered={kana.isHovered}
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