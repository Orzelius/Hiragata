import * as React from 'react';
import { useState } from 'react';
import * as wanakana from 'wanakana';
import { getWord, Word } from '../Api';
import { Button, Title, Container } from './BasicComponents';
import JapWord from './JapWord/JapWord';
import { Router, Redirect, useHistory } from 'react-router';

interface State {
  word: Word
  input: string
  complete: boolean
  inputColor: string
}
const initState: State = {
  word: getWord(),
  input: "",
  complete: false,
  inputColor: "shadow-outline"
}
const vowels = ["a", "e", "i", "o", "u"];
const notVowels = ["r", "t", "p", "s", "d", "f", "g", "h", "j", "k", "b", "n", "m"];

const Home: React.FC = () => {

  const [state, setState] = useState(initState);
  const history = useHistory();

  let kanjiJsx: JSX.Element;

  if (state.word.kanji) {
    kanjiJsx = (
      <h2 className="text-black text-2xl tracking-wide inline-block mr-4">{state.word.kanji}</h2>
    );
  }
  else {
    kanjiJsx = null;
  }

  const fakeType = () => {
    if (state.complete) {
      reset();
      return;
    }
    const makeError: boolean = Math.random() < 0.2 ? true : false;
    let input = state.input;
    const inpLen = input.length;
    const correctCurrentChar =
      input.charAt(inpLen - 1) === state.word.katakana.charAt(inpLen - 1) ||
      input.charAt(inpLen - 1) === state.word.hiragana.charAt(inpLen - 1);
    if (correctCurrentChar || inpLen == 0) {
      if (makeError) {
        const addVowel: boolean = Math.random() < 0.2 ? true : false;
        const addition = addVowel ?
          vowels[Math.floor(Math.random() * vowels.length)] :
          notVowels[Math.floor(Math.random() * notVowels.length)] + vowels[Math.floor(Math.random() * vowels.length)];
        if (state.word.kanji) {
          input += wanakana.toHiragana(addition);
        }
        else {
          input += wanakana.toKatakana(addition);
        }
      }
      else {
        if (state.word.kanji) {
          input += state.word.hiragana.charAt(inpLen);
        }
        else {
          input += state.word.katakana.charAt(inpLen);
        }
      }
    }
    else {
      input = input.slice(0, inpLen - 1);
    }
    // console.log("Fake input: ", input, "Error: ", makeError);
    handleInputChange(input);
  }

  setTimeout(fakeType, Math.floor(Math.random() * 1000) + 100);

  const reset = () => {
    if (state.complete) {
      let word: Word;
      if (state.word.kanji) {
        word = getWord(false);
      }
      else {
        word = getWord();
      }
      let newState = {
        ...state,
        input: "",
        complete: false,
        word,
        inputColor: "shadow-outline"
      }
      setState(newState);
    }
  }

  const handleInputChange = (value: string) => {
    let complete = false;
    let inputColor = "shadow-outline";
    if (value == state.word.hiragana || value === state.word.katakana) {
      complete = true;
      inputColor = 'shadow-outline-green';
    }
    let newState = {
      ...state,
      inputColor,
      complete,
      input: value
    }
    setState(newState);
  }

  return (
    <Container className="container p-2 mt-20 md:mt-10 lg:px-32 pb-8">
      <div className="flex content-center">
        <Title>
          A tool for learning hiragana and katakana, with real life words
        </Title>
      </div>
      <div className="px-8 sm:px-2 p-4 sm:mx-20 mb-6">
        <div className="w-full border-b border-gray-400"></div>
      </div>
      <div className="p-2 pr-8 border-l-2 border-gray-600">
        <h2 className="text-2xl text-gray-800 mb-6 sm:text-3xl">Learn by doing, not looking</h2>
        <div className="mt-4 mb-2">
          {/* <h2 className="text-black text-2xl jap-text font-semibold subpixel-antialiased inline-block border-b border-gray-400">ベッド</h2> */}
          <JapWord input={state.input} word={state.word} hiragana={state.word.kanji ? true : false}></JapWord>
          <div className="ml-1 mt-1 block sm:inline-block sm:ml-3">
            {kanjiJsx}
            <h2 className="text-gray-700 text-2xl inline-block">{state.word.english}</h2>
          </div>
        </div>
        <form>
          <input className={"h-10 jap-text text-xl max-w-md bg-white border border-gray-300 py-2 px-4 block w-full inline-block " +
            state.inputColor}
            type="text" placeholder="Input" id="input" readOnly value={state.input} />
        </form>
      </div>
      <div className="px-6 sm:px-2 p-4 sm:p-6">
        <div className="w-full border-b border-gray-300"></div>
      </div>
      <div className="p-2 pl-8 border-r-2 border-gray-600 justify-end clearfix">
        <h2 className="text-2xl text-gray-800 mb-6 sm:text-3xl text-right">Any input you want</h2>
        <div className="clearfix">
          <p className="text-right text-gray-600 text-lg">Katakana</p>
          <input
            className={"h-10 jap-text text-xl max-w-md bg-white border-2 border-gray-300 py-2 px-4 text-right block w-full inline-block float-right"}
            type="text" placeholder="Input" readOnly value={wanakana.toKatakana(state.input)} />
        </div>
        <div className="clearfix">
          <p className="text-right text-gray-600 text-lg">Hiragana</p>
          <input
            className={"h-10 jap-text text-xl max-w-md bg-white border-2 border-gray-300 py-2 px-4 text-right block w-full inline-block float-right"}
            type="text" placeholder="Input" readOnly value={wanakana.toHiragana(state.input)} />
        </div>
        <div className="clearfix">
          <p className="text-right text-gray-600 text-lg">Romanji</p>
          <input
            className={"h-10 jap-text text-xl max-w-md bg-white border-2 border-gray-300 py-2 px-4 text-right block w-full inline-block float-right"}
            type="text" placeholder="Input" readOnly value={wanakana.toRomaji(state.input)} />
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <Button onClick={() => {return(history.push('/start'))}} className="trans-0 border max-w-sm h-16 w-full border-gray-500 rounded-sm shadow hover:bg-gray-500 text-xl text-gray-800 hover:font-bold font-semibold hover:text-white" color="">
          Get Started
        </Button>
      </div>
    </Container>
  );
}

export default Home;