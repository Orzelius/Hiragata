import * as React from 'react';
import { stringToWord, consonants, vowels } from '../../../Helpers/Helpers';

const KanaTable: React.FC = () => {
  let kana: string[][] = [[]];
  kana.push(['', ...vowels]);
  consonants.forEach((consonant, index1) => {
    let hiraganas: string[] = [];
    hiraganas.push(consonant);
    vowels.forEach(vowel => {
      hiraganas.push(consonant + vowel);
    });
    kana.push(hiraganas);
  });

  let block: JSX.Element[][] = [[]];

  kana.forEach((row) => {
    let jsxRow: JSX.Element[] = [];
    row.forEach((element, index) => {
      let final = row.length === index;
      jsxRow.push(
        <div className={"border-gray-600 border w-10 h-10 inline-block"}>{element}</div>
      );
    })
    block.push(jsxRow, [<div key="space" className=""></div>]);
  });
  block.push(
  );

  console.log(kana)
  return (
    <div className="">
      {...[...block]}
    </div>
  );
}

export default KanaTable;