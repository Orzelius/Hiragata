import * as React from 'react';
import { Word } from '../../Api';

interface Props{
  word: Word
  input: string
  hiragana: boolean
}

const JapWord: React.FC<Props> = ({word, input, hiragana}) => {
  let wordJsx: JSX.Element[] = [];
  let markup: string = "";
  let correct = true;
  let lenght = hiragana ? word.hiragana.length : word.katakana.length;
  for (var i = 0; i < lenght; i++) {
    if(correct){
      if(!input){
        markup = "text-black";
      }
      else if(input.charAt(i) === word.katakana.charAt(i) || input.charAt(i) === word.hiragana.charAt(i)){
        markup = "text-green-700";
      }
      else{
        correct = false;
        markup = "text-red-700";
      }
    }
    else{
      markup = "text-black"
    }
    // console.log("Correct: ", correct,　"i: ", i, "\nInput: ", input, "\nWord: ", word, "\nChar: ", word.charAt(i), "\nMarkup: ", markup);
    wordJsx.push(
      <h2 key={i} className={"text-2xl jap-text font-semibold subpixel-antialiased inline-block " + markup}>
        {hiragana ? word.hiragana.charAt(i) : word.katakana.charAt(i)}
      </h2>
    );
  }
  return(
    <div className="inline-block bg-gray-300 hover:bg-gray-400 rounded-lg px-4 cursor-default">
      {...wordJsx}
    </div>
  );
}

export default JapWord;