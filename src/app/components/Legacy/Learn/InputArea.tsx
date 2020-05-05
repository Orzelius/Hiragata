import * as React from 'react';
import { useHistory } from 'react-router';
import { getWord, Word } from '../../../Api';
import { evaluateInput } from '../../../Helpers/Helpers';
import { AppSettings } from '../../../models';
import JapWord from '../JapWord/JapWord';

const initState = {
  word: getWord(),
  input: '',
  complete: false,
  inputColor: 'shadow-outline',
};
interface Props {
  settings: AppSettings;
}
const InputArea: React.FC<Props> = ({ settings }) => {
  const [state, setState] = React.useState(initState);
  const history = useHistory();

  let kanjiJsx: JSX.Element;

  if (state.word.kanji) {
    kanjiJsx = (
      <h2 className="text-black text-2xl tracking-wide inline-block mr-4">{state.word.kanji}</h2>
    );
  } else {
    kanjiJsx = null;
  }

  const reset = () => {
    if (state.complete) {
      let word: Word;
      if (state.word.kanji) {
        word = getWord(false);
      } else {
        word = getWord();
      }
      const newState = {
        ...state,
        input: '',
        complete: false,
        word,
        inputColor: 'shadow-outline',
      };
      setState(newState);
    }
  };

  const handleInputChange = (value: string) => {
    let complete = false;
    let inputColor = 'shadow-outline';
    if (evaluateInput(value, state.word, settings)) {
      complete = true;
      inputColor = 'shadow-outline-green';
    }
    const newState = {
      ...state,
      inputColor,
      complete,
      input: value,
    };
    setState(newState);
  };

  return (
    <div>
      <div className="p-2 pr-8">
        <div className="mt-4 mb-2">
          <JapWord settings={settings} input={state.input} word={state.word} />
          <div className="ml-1 mt-1 block sm:inline-block sm:ml-3">
            {kanjiJsx}
            <h2 className="text-gray-700 text-2xl inline-block">{state.word.english}</h2>
          </div>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          reset();
        }}
        >
          <input
            className={'h-10 jap-text text-xl max-w-md bg-white border border-gray-300 py-2 px-4 block w-full inline-block '
            + state.inputColor}
            type="text"
            placeholder="Input"
            id="input"
            onChange={(e) => handleInputChange(e.target.value)}
            value={state.input}
          />
        </form>
      </div>
    </div>
  );
};

export default InputArea;