/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
import * as React from 'react';
import * as wanakana from 'wanakana';
import { vowels, consonants } from '../../../Helpers/Helpers';
import KanaTableElement from './KanaTableElement';
import { ElementContext } from '../../ElementContext';
import KanaTableButtons from './KanaTableButtons';

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

export interface KanaElement {
  latin: string;
  katakana: string;
  hiragana: string;
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

const transposeArray = (array: Element[][]): Element[][] => {
  const newArray: Element[][] = [];
  for (let i = 0; array[0][i]; i++) {
    newArray.push([]);
  }

  array.forEach(row => {
    row.forEach(el => {
      newArray[el.x].push(el);
    });
  });
  return newArray;
};

interface Props {
  kana: string;
  showKana: boolean;
  horizontal: boolean;
}
const KanaTable: React.FC<Props> = props => {
  const elementContext = React.useContext(ElementContext);
  const [state, setState] = React.useState(generateTable());
  const [tableDrawn, setTableDrawn] = React.useState(false);
  const initSelectedElements: KanaElement[] = [];
  const [selectedElements, setSelectedElements] = React.useState(initSelectedElements);

  const onElementHover = (x: number, y: number, hoverIn = true) => {
    let newState = [...state].map(row => row.map(el => ({ ...el, isHovered: false })));
    const hoverElement = newState[y].find(e => e.x === x);
    const hoverElementI = newState[y].findIndex(e => e.x === x);
    if (hoverElementI !== -1) {
      newState[y][hoverElementI].isHovered = hoverIn;
    }
    if (hoverElement.isBorder) {
      if (x === 0) {
        newState[y] = newState[y].map(e => {
          e.isHovered = hoverIn;
          return e;
        });
      }
      if (y === 0) {
        newState.forEach((row, rowIndex) => {
          const elementIndex = newState[rowIndex].findIndex(e => e.x === x);
          if (elementIndex !== -1) {
            newState[rowIndex][elementIndex].isHovered = hoverIn;
          }
        });
      }
      if (y === 0 && x === 0) {
        newState = newState.map(row => (
          row.map(element => ({ ...element, isHovered: hoverIn }))
        ));
      }
    }
    setState(newState);
  };

  const ElementClick = (x: number, y: number, table: Element[][] = null) => {
    // Elements that have changed, array
    const changes = [{ x, y }];
    changes.push({ x: 0, y: 0 });

    let newTable = table || [...state];
    const { isSelected } = newTable[y].find(e => e.x === x);

    // Select individual
    const selectedElement = newTable[y].find(e => e.x === x);
    const selectedElementI = newTable[y].findIndex(e => e.x === x);
    newTable[y][selectedElementI].isSelected = !isSelected;

    // Select rows
    if (selectedElement.isBorder) {
      if (x === 0) {
        newTable[y] = newTable[y].map(e => {
          e.isSelected = !isSelected;
          changes.push({ x: e.x, y });
          return e;
        });
      }
      if (y === 0) {
        newTable.forEach((row, rowIndex) => {
          const elementIndex = newTable[rowIndex].findIndex(e => e.x === selectedElementI);
          if (elementIndex !== -1) {
            newTable[rowIndex][elementIndex].isSelected = !isSelected;
            changes.push({ x: elementIndex, y: rowIndex });
          }
        });
      }
      if (y === 0 && x === 0) {
        newTable = newTable.map(row => (
          row.map(element => ({ ...element, isSelected: !isSelected }))
        ));
      }
    }

    // Deselect border elements
    if (isSelected) {
      newTable[0][x].isSelected = false;
      newTable[y][0].isSelected = false;
    }

    // Select/deselect borders, if every element in row/column has been changed
    changes.forEach(change => {
      // Check Y row (up/down)
      let allSelected = true;
      for (let y = 1; y < newTable.length && allSelected; y++) {
        const changedELement = newTable[y].find(e => e.x === change.x);
        if (changedELement && !changedELement.isSelected) {
          allSelected = false;
        }
      }
      newTable[0][change.x].isSelected = allSelected;

      // Check X column (right/left)
      allSelected = true;
      for (let x = 1; x < newTable[change.y].length; x++) {
        if (!newTable[change.y][x].isSelected) {
          allSelected = false;
        }
      }
      newTable[change.y][0].isSelected = allSelected;
    });

    const allKana: Element[] = [].concat(...newTable);
    const validKana = allKana.filter(element => !element.isBorder && element.isSelected);
    const selectedKana: KanaElement[] = validKana.map(element => ({
      hiragana: element.hiragana,
      katakana: element.katakana,
      latin: element.latin,
    }));
    return { selectedKana, newState: newTable };
  };

  const onElementClick = (x: number, y: number) => {
    const result = ElementClick(x, y);
    setState(result.newState);
    setSelectedElements(result.selectedKana);
  };

  if (elementContext.state.elements !== null && !tableDrawn) {
    // WARNING, this is extremely big brain code, don't think about it too much
    let result: {
      selectedKana: KanaElement[];
      newState: Element[][];
    } = {
      newState: null,
      selectedKana: null,
    };
    elementContext.state.elements.forEach(el => {
      state.forEach(row => {
        row.forEach(stateEl => {
          if (!stateEl.isBorder && stateEl.latin === el.latin) {
            result = ElementClick(stateEl.x, stateEl.y, result.newState);
          }
        });
      });
    });
    setTableDrawn(true);
    setState(result.newState);
    setSelectedElements(result.selectedKana);
  }

  let rowElements: JSX.Element[] = [];
  const drawArray = props.horizontal ? transposeArray(state) : state;
  return (
    <div>
      <table className="mx-auto">
        <tbody onMouseEnter={() => onElementHover(0, 0, false)}>
          {/* <tbody> */}
          {drawArray.map((kanaRow, y) => {
            rowElements = [];
            for (let x = 0; x < drawArray[0].length; x++) {
              const element = kanaRow.find(e => (props.horizontal ? e.y === x : e.x === x));
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
                let style = 'p-1 ';
                if (element.y === 0) {
                  style += props.horizontal ? 'pr-6 ' : 'pb-5 ';
                }
                if (element.x === 0) {
                  style += props.horizontal ? 'pb-5 ' : 'pr-4 ';
                }
                rowElements.push(
                  <td className={style} key={Math.random()}>
                    <div
                      key={Math.random()}
                      onMouseOver={element.isHovered ? null : () => { onElementHover(element.x, element.y, true); }}
                      onMouseLeave={() => { onElementHover(element.x, element.y, false); }}
                      onClick={() => { onElementClick(element.x, element.y); }}
                    >
                      <KanaTableElement
                        kana={kana}
                        latin={(props.showKana && !element.isBorder) ? kana : element.latin}
                        isSelected={element.isSelected}
                        isBorder={element.isBorder}
                        isHovered={element.isHovered}
                        x={element.x}
                        y={element.y}
                        horizontal={props.horizontal}
                      />
                    </div>
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
      <div className={props.horizontal ? 'mt-6' : ''}>
        <KanaTableButtons selectedElements={selectedElements} />
      </div>
    </div>
  );
};

export default KanaTable;