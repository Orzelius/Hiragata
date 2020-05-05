import * as React from 'react';
import * as wanakana from 'wanakana';
import { Word } from '../../../Api';
import { evaluateInput, stringToWord } from '../../../Helpers/Helpers';
import { AppSettings } from '../../../models';

interface Props {
  word: Word;
  input: string;
  settings: AppSettings;
}

const JapWord: React.FC<Props> = ({ word, input, settings }) => {
  const wordJsx: JSX.Element[] = [];
  let markup = '';
  const correct = true;
  const lenght = settings.practice.hiragana ? word.hiragana.length : word.katakana.length;
  const isKana = wanakana.isKana(input);
  for (let i = 0; i < lenght; i++) {
    // THIS CODE MADE STUFF GREEN AND BLACK
    // if (correct) {
    //   if (!input) {
    //     markup = "text-black";
    //   }
    //   else if (evaluateInput(input.slice(i), stringToWord(word.hiragana.slice(i)), settings)) {
    //     markup = "text-green-700";
    //   }
    //   else {
    //     correct = false;
    //     markup = "text-red-800";
    //   }
    // }
    // else {
    //   markup = "text-black"
    // }
    markup = 'text-black';
    // console.log("Correct: ", correct,　"i: ", i, "\nInput: ", input, "\nWord: ", word, "\nChar: ", word.charAt(i), "\nMarkup: ", markup);
    wordJsx.push(
      <h2 key={i} className={'text-2xl jap-text font-semibold subpixel-antialiased inline-block ' + markup}>
        {settings.practice.hiragana ? word.hiragana.charAt(i) : word.katakana.charAt(i)}
      </h2>,
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
};

export default JapWord;