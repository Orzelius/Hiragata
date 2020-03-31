/* eslint-disable no-shadow */
import * as React from 'react';
import * as wanakana from 'wanakana';
import { consonants, vowels } from '../../../Helpers/Helpers';
import KanaElement from './KanaElement';

interface Element {
  latin: string;
  katakana: string;
  hiragana: string;
  isSelected: boolean;
  isHovered: boolean;
  isBorder: boolean;
  x: number;
  y: number;
}

function generateTable() {
  const basicElement: Element = {
    katakana: '',
    hiragana: '',
    isBorder: false,
    latin: '',
    isSelected: false,
    isHovered: false,
    x: 0,
    y: 0,
  };
  const initialKanaTable: Element[][] = [[], []];
  vowels.forEach((vowel, index) => {
    if (index === 0) {
      initialKanaTable[0].push({ ...basicElement, latin: '-' });
      initialKanaTable[1].push({ ...basicElement, latin: 'a' });
    }
    initialKanaTable[0].push({
      ...basicElement,
      hiragana: wanakana.toHiragana(vowel),
      katakana: wanakana.toKatakana(vowel),
      latin: vowel,
      isBorder: true,
      x: index,
    });
    initialKanaTable[1].push({
      ...basicElement,
      hiragana: wanakana.toHiragana(vowel),
      katakana: wanakana.toKatakana(vowel),
      latin: vowel,
      isBorder: false,
      x: index,
      y: 1,
    });
  });
  consonants.forEach((consonant, y) => {
    initialKanaTable.push([]);
    const syllables: string[] = [];
    syllables.push(consonant);
    vowels.forEach((vowel) => {
      syllables.push(consonant + vowel);
    });
    syllables.forEach((syllable, x) => {
      if (x === 0) {
        initialKanaTable[2 + y].push({
          ...basicElement,
          latin: syllable,
          isBorder: true,
          x: 0,
        });
      } else {
        let romaji = syllable;
        if (syllable === 'we' || syllable === 'wi' || syllable === 'yi' || syllable === 'ye' || syllable === 'wu') {
          romaji = '-';
        }
        initialKanaTable[2 + y].push({
          ...basicElement,
          hiragana: wanakana.toHiragana(romaji),
          katakana: wanakana.toKatakana(romaji),
          latin: syllable,
          isBorder: true,
          x,
          y: y + 1,
        });
      }
    });
  });
  initialKanaTable.forEach((row, y) => {
    row.forEach((element, x) => {
      initialKanaTable[y][x] = {
        ...initialKanaTable[y][x],
        isBorder: x === 0 || y === 0,
        x,
        y,
      };
    });
  });

  return initialKanaTable;
}


interface Props {
  kana: string;
}
const KanaTable: React.FC<Props> = (props) => {
  const [state, setState] = React.useState({ kanaTable: generateTable() });


  const onElementHover = (x: number, y: number, hoverIn = true) => {
    const newState = { ...state };
    newState.kanaTable[y][x].isHovered = hoverIn;
    if (newState.kanaTable[y][x].isBorder) {
      if (x === 0) {
        newState.kanaTable[y] = newState.kanaTable[y].map((e) => {
          e.isHovered = hoverIn;
          return e;
        });
      }
      if (y === 0) {
        newState.kanaTable.forEach((row, rowIndex) => {
          newState.kanaTable[rowIndex][x].isHovered = hoverIn;
        });
      }
      if (y === 0 && x === 0) {
        newState.kanaTable = newState.kanaTable.map((row) => (
          row.map((element) => ({ ...element, isHovered: hoverIn }))
        ));
      }
    }
    setState(newState);
  };

  const onElementClick = (x: number, y: number) => {
    // Elements that have changed, array
    const changes = [[x, y]];
    changes.push([0, 0]);

    const newState = { ...state };
    const { isSelected } = newState.kanaTable[y][x];

    // Select individual
    newState.kanaTable[y][x].isSelected = !isSelected;

    // Select rows
    if (newState.kanaTable[y][x].isBorder) {
      if (x === 0) {
        newState.kanaTable[y] = newState.kanaTable[y].map((e) => {
          e.isSelected = !isSelected;
          changes.push([e.x, y]);
          return e;
        });
      }
      if (y === 0) {
        newState.kanaTable.forEach((row, rowIndex) => {
          newState.kanaTable[rowIndex][x].isSelected = !isSelected;
          changes.push([x, rowIndex]);
        });
      }
      if (y === 0 && x === 0) {
        newState.kanaTable = newState.kanaTable.map((row) => (
          row.map((element) => ({ ...element, isSelected: !isSelected }))
        ));
      }
    }

    // Deselect border elements
    if (isSelected) {
      newState.kanaTable[0][x].isSelected = false;
      newState.kanaTable[y][0].isSelected = false;
    }

    // Select/deselect borders, if every element in row/column in selected
    changes.forEach((change) => {
      // Check Y row (up/down)
      let allSelected = true;
      for (let y = 1; y < newState.kanaTable.length && allSelected; y++) {
        if (!newState.kanaTable[y][change[0]].isSelected) {
          allSelected = false;
        }
      }
      newState.kanaTable[0][change[0]].isSelected = allSelected;

      // Check X column (right/left)
      allSelected = true;
      for (let x = 1; x < newState.kanaTable[change[1]].length; x++) {
        if (!newState.kanaTable[change[1]][x].isSelected) {
          allSelected = false;
        }
      }
      newState.kanaTable[change[1]][0].isSelected = allSelected;
    });


    setState(newState);
  };

  return (
    <div className="">
      {state.kanaTable.map((kanaRow) => {
        const rowElements = kanaRow.map((element) => {
          let kana = '';
          if (props.kana === 'Hiragana') {
            kana = element.hiragana;
          } else if (props.kana === 'Katakana') {
            kana = element.katakana;
          } else if (props.kana === 'Both') {
            kana = element.hiragana + element.katakana;
          }
          return (
            <KanaElement
              hoverIn={() => { onElementHover(element.x, element.y, true); }}
              hoverOut={() => { onElementHover(element.x, element.y, false); }}
              key={Math.random()}
              click={() => { onElementClick(element.x, element.y); }}
              kana={kana}
              latin={element.latin}
              isSelected={element.isSelected}
              isBorder={element.isBorder}
              isHovered={element.isHovered}
              x={element.x}
              y={element.y}
            />
          )
        });
        return (
          <div key={Math.random()}>
            {...rowElements}
          </div>
        );
      })}
    </div>
  );
};

export default KanaTable;
