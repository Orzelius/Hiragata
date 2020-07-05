/* eslint-disable no-shadow */
import * as React from 'react';
import * as wanakana from 'wanakana';
import { consonants, vowels } from '../../../Helpers/Helpers';
import KanaElement from './KanaElement';
import * as Parent from './KanaSelector';

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
  initialKanaTable[0].push({ ...basicElement, latin: '-' });
  initialKanaTable[1].push({ ...basicElement, latin: 'a', y: 1 });
  vowels.forEach((vowel, index) => {
    initialKanaTable[0].push({
      ...basicElement,
      hiragana: wanakana.toHiragana(vowel),
      katakana: wanakana.toKatakana(vowel),
      latin: vowel,
      isBorder: true,
      x: index + 1,
    });
    initialKanaTable[1].push({
      ...basicElement,
      hiragana: wanakana.toHiragana(vowel),
      katakana: wanakana.toKatakana(vowel),
      latin: vowel,
      isBorder: false,
      x: index + 1,
      y: 1,
    });
  });
  consonants.forEach((consonant, y) => {
    initialKanaTable.push([]);
    const syllables: string[] = [];
    syllables.push(consonant);
    vowels.forEach(vowel => {
      syllables.push(consonant + vowel);
    });
    syllables.forEach((romanji, x) => {
      if (x === 0) {
        initialKanaTable[2 + y].push({
          ...basicElement,
          latin: romanji,
          isBorder: true,
          x: 0,
          y: y + 2,
        });
      } else if (romanji !== 'we' && romanji !== 'wi' && romanji !== 'yi' && romanji !== 'ye' && romanji !== 'wu') {
        initialKanaTable[2 + y].push({
          ...basicElement,
          hiragana: wanakana.toHiragana(romanji),
          katakana: wanakana.toKatakana(romanji),
          latin: romanji,
          isBorder: true,
          x,
          y: y + 2,
        });
      }
    });
  });
  initialKanaTable.forEach((row, y) => {
    row.forEach((element, x) => {
      initialKanaTable[y][x] = {
        ...initialKanaTable[y][x],
        isBorder: x === 0 || y === 0,
      };
    });
  });
  return initialKanaTable;
}

interface Props {
  kana: string;
  setSelect: (selection: Parent.Element[]) => void;
  showKana: boolean;
}
const KanaTable: React.FC<Props> = props => {
  const [state, setState] = React.useState({ kanaTable: generateTable() });

  const onElementHover = (x: number, y: number, hoverIn = true) => {
    const newState = { ...state };
    const hoverElement = newState.kanaTable[y].find(e => e.x === x);
    const hoverElementI = newState.kanaTable[y].findIndex(e => e.x === x);
    if (hoverElementI !== -1) {
      newState.kanaTable[y][hoverElementI].isHovered = hoverIn;
    }
    if (hoverElement.isBorder) {
      if (x === 0) {
        newState.kanaTable[y] = newState.kanaTable[y].map(e => {
          e.isHovered = hoverIn;
          return e;
        });
      }
      if (y === 0) {
        newState.kanaTable.forEach((row, rowIndex) => {
          const elementIndex = newState.kanaTable[rowIndex].findIndex(e => e.x === x);
          if (elementIndex !== -1) {
            newState.kanaTable[rowIndex][elementIndex].isHovered = hoverIn;
          }
        });
      }
      if (y === 0 && x === 0) {
        newState.kanaTable = newState.kanaTable.map(row => (
          row.map(element => ({ ...element, isHovered: hoverIn }))
        ));
      }
    }
    setState(newState);
  };

  const onElementClick = (x: number, y: number) => {
    // Elements that have changed, array
    const changes = [{ x, y }];
    changes.push({ x: 0, y: 0 });

    const newState = { ...state };
    const { isSelected } = newState.kanaTable[y].find(e => e.x === x);

    // Select individual
    const selectedElement = newState.kanaTable[y].find(e => e.x === x);
    const selectedElementI = newState.kanaTable[y].findIndex(e => e.x === x);
    newState.kanaTable[y][selectedElementI].isSelected = !isSelected;

    // Select rows
    if (selectedElement.isBorder) {
      if (x === 0) {
        newState.kanaTable[y] = newState.kanaTable[y].map(e => {
          e.isSelected = !isSelected;
          changes.push({ x: e.x, y });
          return e;
        });
      }
      if (y === 0) {
        newState.kanaTable.forEach((row, rowIndex) => {
          const elementIndex = newState.kanaTable[rowIndex].findIndex(e => e.x === selectedElementI);
          if (elementIndex !== -1) {
            newState.kanaTable[rowIndex][elementIndex].isSelected = !isSelected;
            changes.push({ x: elementIndex, y: rowIndex });
          }
        });
      }
      if (y === 0 && x === 0) {
        newState.kanaTable = newState.kanaTable.map(row => (
          row.map(element => ({ ...element, isSelected: !isSelected }))
        ));
      }
    }

    // Deselect border elements
    if (isSelected) {
      newState.kanaTable[0][x].isSelected = false;
      newState.kanaTable[y][0].isSelected = false;
    }

    // Select/deselect borders, if every element in row/column has been changed
    changes.forEach(change => {
      // Check Y row (up/down)
      let allSelected = true;
      for (let y = 1; y < newState.kanaTable.length && allSelected; y++) {
        const changedELement = newState.kanaTable[y].find(e => e.x === change.x);
        if (changedELement && !changedELement.isSelected) {
          allSelected = false;
        }
      }
      newState.kanaTable[0][change.x].isSelected = allSelected;

      // Check X column (right/left)
      allSelected = true;
      for (let x = 1; x < newState.kanaTable[change.y].length; x++) {
        if (!newState.kanaTable[change.y][x].isSelected) {
          allSelected = false;
        }
      }
      newState.kanaTable[change.y][0].isSelected = allSelected;
    });
    setState(newState);

    const allKana: Element[] = [].concat(...newState.kanaTable);
    const validKana = allKana.filter(element => !element.isBorder && element.isSelected);
    const selectedKana: Parent.Element[] = validKana.map(element => ({
      hiragana: element.hiragana,
      katakana: element.katakana,
      latin: element.latin,
    }));
    props.setSelect(selectedKana);
  };

  let rowElements: JSX.Element[] = [];
  return (
    <table className="">
      <tbody>
        {state.kanaTable.map(kanaRow => {
          rowElements = [];
          for (let x = 0; x < state.kanaTable[0].length; x++) {
            const element = kanaRow.find(e => e.x === x);
            if (!element) {
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              rowElements.push(<td key={Math.random()} />);
            } else {
              let kana = '';
              if (props.kana === 'Hiragana') {
                kana = element.hiragana;
              } else if (props.kana === 'Katakana') {
                kana = element.katakana;
              } else if (props.kana === 'Both') {
                kana = element.hiragana + element.katakana;
              }
              rowElements.push(
                <td key={Math.random()}>
                  <KanaElement
                    showKanaOnHover={props.showKana}
                    hoverIn={() => { onElementHover(element.x, element.y, true); }}
                    hoverOut={() => { onElementHover(element.x, element.y, false); }}
                    click={() => { onElementClick(element.x, element.y); }}
                    kana={kana}
                    latin={(props.showKana && !element.isBorder) ? kana : element.latin}
                    isSelected={element.isSelected}
                    isBorder={element.isBorder}
                    isHovered={element.isHovered}
                    x={element.x}
                    y={element.y}
                  />
                </td>,
              );
            }
          }
          return (
            <tr key={Math.random()}>
              {...rowElements}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default KanaTable;
