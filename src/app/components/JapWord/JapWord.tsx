import * as React from 'react';
import { Word } from '../../Api';
import { evaluateInput, stringToWord } from '../Learn/Helpers';
import * as wanakana from 'wanakana';
import { appSettings } from '../../models';

interface Props {
  word: Word
  input: string
  hiragana: boolean
  settings: appSettings
}

const JapWord: React.FC<Props> = ({ word, input, hiragana, settings }) => {
  let wordJsx: JSX.Element[] = [];
  let markup: string = "";
  let correct = true;
  let lenght = hiragana ? word.hiragana.length : word.katakana.length;
  const isKana = wanakana.isKana(input);
    for (var i = 0; i < lenght; i++)
      {
      if (correct) {
        if (!input) {
          markup = "text-black";
        }
        else if (evaluateInput(input.charAt(i), stringToWord(word.hiragana.charAt(i)), settings)) {
          markup = "text-green-700";
        }
        else {
          correct = false;
          markup = "text-red-700";
        }
      }
      else {
        markup = "text-black"
      }
      // console.log("Correct: ", correct,　"i: ", i, "\nInput: ", input, "\nWord: ", word, "\nChar: ", word.charAt(i), "\nMarkup: ", markup);
      wordJsx.push(
        <h2 key={i} className={"text-2xl jap-text font-semibold subpixel-antialiased inline-block " + markup}>
          {hiragana ? word.hiragana.charAt(i) : word.katakana.charAt(i)}
        </h2>
      );
    }
  return (
    <div className="inline-block">
      <div className="bg-gray-300 hover:bg-gray-400 rounded-lg px-4 cursor-default">
        {...wordJsx}
      </div>
      {/* <h2 className={"jap-text font-light text-sm subpixel-antialiased inline-block bg-green-200 rounded-lg px-2 mx-2"}>
        {word.jlpt}
      </h2> */}
    </div>
  );
}

export default JapWord;