/* eslint-disable no-shadow */
import * as React from 'react';
import * as wanakana from 'wanakana';
import { consonants, vowels } from '../../../Helpers/Helpers';
import KanaElement from './KanaElement';

interface Element {
  latin: string;
  kana: string;
  isSelected: boolean;
  isHovered: boolean;
  isBorder: boolean;
  x: number;
  y: number;
}

const basicElement: Element = {
  kana: '',
  isBorder: false,
  latin: '',
  isSelected: false,
  isHovered: false,
  x: 0,
  y: 0,
};

const initialKanaTable: Element[][] = [[]];
vowels.forEach((vowel, index) => {
  if (index === 0) {
    initialKanaTable[0].push({ ...basicElement, latin: '-' });
  }
  initialKanaTable[0].push({
    ...basicElement,
    kana: (wanakana.toHiragana(vowel) + '' + wanakana.toKatakana(vowel)),
    latin: vowel,
    isBorder: true,
    x: index,
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
      initialKanaTable[1 + y].push({
        ...basicElement,
        latin: syllable,
        isBorder: true,
        x: 0,
      });
    } else {
      let kana = wanakana.toHiragana(syllable) + ' ' + wanakana.toKatakana(syllable);
      if (syllable === 'we' || syllable === 'wi' || syllable === 'yi' || syllable === 'ye' || syllable === 'wu') {
        kana = '-';
      }
      initialKanaTable[1 + y].push({
        ...basicElement,
        kana,
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

const KanaTable: React.FC = () => {
  const [state, setState] = React.useState({ kanaTable: initialKanaTable });


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
      {state.kanaTable.map((kanaRow, y) => {
        const rowElements = kanaRow.map((kana, x) => (
          <KanaElement
            hoverIn={() => { onElementHover(kana.x, kana.y, true); }}
            hoverOut={() => { onElementHover(kana.x, kana.y, false); }}
            key={Math.random()}
            click={() => { onElementClick(kana.x, kana.y); }}
            kana={kana.kana}
            latin={kana.latin}
            isSelected={kana.isSelected}
            isBorder={kana.isBorder}
            isHovered={kana.isHovered}
            x={kana.x}
            y={kana.y}
          />
        ));
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
